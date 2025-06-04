import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../../stores/useUserStore";

const diasDisponibles = [1, 3, 5]; // lunes, miércoles, viernes
const horariosDisponibles = [10, 12, 14, 16];

const Calendario = ({ especialidad }) => {

const [fechas, setFechas] = useState([]);
const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
const [semanaOffset, setSemanaOffset] = useState(0);
const ahora = new Date();
const navigate = useNavigate();
const addTurno = useUserStore((state) => state.addTurno);

useEffect(() => {
const generarFechas = () => {
    const fechasValidas = [];
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + semanaOffset * 7);
    let diaActual = new Date(hoy);

    while (fechasValidas.length < 10) {
    if (diasDisponibles.includes(diaActual.getDay())) {
        fechasValidas.push(new Date(diaActual));
    }
    diaActual.setDate(diaActual.getDate() + 1);
    }
    setFechas(fechasValidas);
};

generarFechas();
}, [semanaOffset]);

const esHorarioPasado = (fecha, hora) => {
const turno = new Date(fecha);
turno.setHours(hora, 0, 0, 0);
return turno < ahora;
};

const seleccionarTurno = (fecha, hora) => {
const turno = { fecha: fecha.toDateString(), hora, especialidad };
setTurnoSeleccionado(turno);
};

const confirmarTurno = async () => {
if (turnoSeleccionado) {
    const horaFormateada = `${String(turnoSeleccionado.hora).padStart(2, "0")}:00`;
    await addTurno(turnoSeleccionado.fecha, horaFormateada, especialidad);
    navigate("/profile");
}
};

const formatearFecha = (fecha) => {
return fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
}).replace(/^\w/, (c) => c.toUpperCase());
};

return (
    <div className="mt-6">
        <h4 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Elegí el día y horario
        </h4>

        <div className="flex justify-center mb-4 gap-4">
        <button
            onClick={() => setSemanaOffset((prev) => prev - 1)}
            className="bg-orange-200 text-orange-800 hover:bg-orange-300 px-4 py-2 rounded-lg shadow"
        >
            ← Semana anterior
        </button>
        <button
            onClick={() => setSemanaOffset((prev) => prev + 1)}
            className="bg-orange-200 text-orange-800 hover:bg-orange-300 px-4 py-2 rounded-lg shadow"
        >
            Semana siguiente →
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fechas.map((fecha, i) => (
            <div
            key={i}
            className="p-4 border rounded-xl shadow hover:shadow-md transition-all bg-white"
            >
            <h5 className="font-semibold text-blue-700 mb-2">
                {formatearFecha(fecha)}
            </h5>
            <div className="flex gap-2 flex-wrap">
                {horariosDisponibles.map((hora) => {
                const deshabilitado = esHorarioPasado(fecha, hora);
                const seleccionado =
                    turnoSeleccionado?.fecha === fecha.toDateString() &&
                    turnoSeleccionado?.hora === hora;

                return (
                    <button
                    key={hora}
                    onClick={() => seleccionarTurno(fecha, hora)}
                    disabled={deshabilitado}
                    className={`py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-200 border 
                        ${
                        deshabilitado
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : seleccionado
                            ? "bg-green-500 text-white border-green-600 shadow"
                            : "bg-orange-200 text-orange-800 hover:bg-orange-300 border-orange-300"
                        }`}
                    >
                    {hora}:00
                    </button>
                );
                })}
            </div>
            </div>
        ))}
        </div>

        {turnoSeleccionado && (
        <div className="mt-6 text-center">
            <p className="text-lg text-green-700 font-medium mb-4">
            Elegiste el turno para <span className="font-semibold">{especialidad}</span> el <strong>{formatearFecha(new Date(turnoSeleccionado.fecha))}</strong> a las <strong>{turnoSeleccionado.hora}:00</strong>
            </p>
            <button
            onClick={confirmarTurno}
            className="bg-black-500 hover:bg-green-600 text-white py-2 px-5 rounded-xl text-sm font-semibold shadow-md"
            >
            Confirmar turno
            </button>
        </div>
        )}
    </div>
);
};

export default Calendario;
