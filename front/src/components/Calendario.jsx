import { useState, useEffect } from "react";
import "./Calendario.css";

const API_URL = "http://localhost:8080/index";

export default function Calendario({ token, onLogout }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [medications, setMedications] = useState({}); // { 'YYYY-MM-DD': { name, time } }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", time: "" });

  // Carregar dados ao iniciar
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.remedios)) {
          const formatted = data.remedios.reduce((acc, item) => {
            const formattedDate = item.date.split("T")[0];
            acc[formattedDate] = {
              id: item._id,
              name: item.name,
              time: item.time,
            };
            return acc;
          }, {});
          setMedications(formatted);
        } else {
          setMedications(data);
        }
      })
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, [token]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  console.log(medications);

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const openModal = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateKey);
    const existing = medications[dateKey];
    setNewMed(existing ? { ...existing } : { name: "", time: "" });
    setIsModalOpen(true);
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.time) return;

    const medicationData = {
      date: selectedDate,
      name: newMed.name,
      time: newMed.time,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(medicationData),
    })
      .then((res) => {
        if (res.status === 401) {
          onLogout();
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        return res.json();
      })
      .then(() => {
        setMedications((prev) => ({
          ...prev,
          [selectedDate]: { ...newMed },
        }));
        setNewMed({ name: "", time: "" });
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao salvar:", err));
  };

  const handleUpdateMedication = (e) => {
    e.preventDefault();

    const existing = medications[selectedDate];
    console.log(existing);

    if (!newMed.name || !newMed.time) return;

    const medicationData = {
      date: selectedDate,
      name: newMed.name,
      time: newMed.time,
    };

    fetch(`http://localhost:8080/index/${existing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(medicationData),
    })
      .then((res) => {
        if (res.status === 401) {
          onLogout();
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then(() => {
        setMedications((prev) => ({
          ...prev,
          [selectedDate]: { ...newMed, id: existing.id },
        }));

        setIsModalOpen(false);
        console.log("Item atualizado com sucesso!");
      })
      .catch((err) => console.error("Erro ao atualizar:", err));
  };

  const handleDeleteMedication = () => {
    const medicationData = {
      date: selectedDate,
      name: "",
      time: "",
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(medicationData),
    })
      .then((res) => {
        if (res.status === 401) {
          onLogout();
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        return res;
      })
      .then(() => {
        setMedications((prev) => {
          const newState = { ...prev };
          delete newState[selectedDate];
          return newState;
        });
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao excluir:", err));
  };

  const renderDays = () => {
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= totalDays; d++) {
      const dayDate = new Date(year, month, d);
      dayDate.setHours(0, 0, 0, 0);

      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday = dayDate.getTime() === today.getTime();
      const med = medications[dateKey];
      const hasMeds = !!med;

      const shouldBeRed = dayDate <= today && !hasMeds;

      days.push(
        <div
          key={d}
          className={`calendar-day ${isToday ? "today" : ""} ${shouldBeRed ? "no-meds" : ""} ${hasMeds ? "has-meds" : ""}`}
          onClick={() => openModal(d)}
        >
          <span className="day-number">{d}</span>
          <div className="med-list">
            {med && (
              <div className="med-item">
                {med.time} - {med.name}
              </div>
            )}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {monthNames[month]} {year}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {medications[selectedDate]
                ? "Editar Remédio"
                : "Adicionar Remédio"}
            </h3>
            <p>Data: {selectedDate}</p>
            <form
              onSubmit={
                medications[selectedDate]
                  ? handleUpdateMedication
                  : handleAddMedication
              }
            >
              <input
                type="text"
                placeholder="Nome do remédio"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                required
              />
              <input
                type="time"
                value={newMed.time}
                onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                {medications[selectedDate] && (
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={handleDeleteMedication}
                    style={{ backgroundColor: "#ff4d4d", color: "white" }}
                  >
                    Excluir
                  </button>
                )}
                <button type="submit" className="btn-save">
                  {medications[selectedDate] ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
