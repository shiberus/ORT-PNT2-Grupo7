import { useEffect, useState } from "react";

export function useTiempoParaProximoTurno(turnos) {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (!turnos || turnos.length === 0) return;

    const ahora = new Date();
    const turnosFuturos = turnos
      .map((t) => {
        return {
          ...t,
          date: new Date(`${t.fecha}T${t.horario}`)
        };
      })
      .filter((t) => t.date > ahora)
      .sort((a, b) => a.date - b.date);

    const siguiente = turnosFuturos[0];
    if (!siguiente) {
      setMensaje("Sin turnos próximos");
      return;
    }

    const fechaTurno = siguiente.date;

    const esHoy =
      fechaTurno.getDate() === ahora.getDate() &&
      fechaTurno.getMonth() === ahora.getMonth() &&
      fechaTurno.getFullYear() === ahora.getFullYear();

    if (esHoy) {
      const horas = String(fechaTurno.getHours()).padStart(2, "0");
      const minutos = String(fechaTurno.getMinutes()).padStart(2, "0");
      setMensaje(`Hoy a las ${horas}:${minutos}`);
    } else {
      const unDiaMs = 1000 * 60 * 60 * 24;
      const diffDias = Math.ceil(
        (fechaTurno - ahora) / unDiaMs
      );
      setMensaje(`Faltan ${diffDias} día${diffDias > 1 ? "s" : ""}`);
    }
  }, [turnos]);

  return mensaje;
}