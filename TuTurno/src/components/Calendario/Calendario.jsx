import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../../stores/useUserStore";
import { supabase } from "../../auth/supabaseAuth";

const diasDisponibles = [1, 3, 5]; // lunes, miércoles, viernes
const horariosDisponibles = [10, 12, 14, 16];

const Calendario = ({ especialidad, onVolver }) => {

    const [fechas, setFechas] = useState([]);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [semanaOffset, setSemanaOffset] = useState(0);
    const [horariosReservadosPorFecha, setHorariosReservadosPorFecha] = useState({});
    const ahora = new Date();
    const navigate = useNavigate();
    const addTurno = useUserStore((state) => state.addTurno);
    const user = useUserStore((state) => state.user);
    const [turnosPropios, setTurnosPropios] = useState(new Set());


    // Cargar fechas validas
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

    // esto carga los turnos q ya se tomaron con el fin de grisearlos y q no este disponibles para elegir
    useEffect(() => {
        const cargarTurnos = async () => {
            const desde = new Date();
            const hasta = new Date();
            hasta.setDate(hasta.getDate() + 30);

            const { data, error } = await supabase
                .from("turnos")
                .select("fecha, horario, especialidad, user_id")
                .gte("fecha", desde.toISOString().split("T")[0])
                .lte("fecha", hasta.toISOString().split("T")[0]);

            if (error) {
                console.error("Error cargando turnos:", error.message);
                return;
            }

            const ocupados = {};
            const propios = new Set();

            for (const turno of data) {
                const clave = `${turno.fecha}_${turno.especialidad}`;
                if (!ocupados[clave]) ocupados[clave] = new Set();
                ocupados[clave].add(turno.horario);

                if (turno.user_id === user.id) {
                    propios.add(`${turno.fecha}_${turno.especialidad}_${turno.horario}`);
                }
            }

            setHorariosReservadosPorFecha(ocupados);
            setTurnosPropios(propios);
        };


        cargarTurnos();
    }, [especialidad]);

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

    const cancelarSeleccion = () => {
        setTurnoSeleccionado(null)
    }

    const reiniciarFecha = () => {
        setSemanaOffset(0)
    }

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
            <div className=" flex justify-center flex space-x-4">
                <button
                    onClick={onVolver}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow mb-4">
                    ⬅️ Volver
                </button>

                {semanaOffset != 0 &&
                    <button
                        onClick={reiniciarFecha}
                        className="bg-red-200 hover:bg-red-300 text-gray-800 px-4 py-2 rounded-lg shadow mb-4">
                        ⬅ Reiniciar fecha
                    </button>
                }
            </div>

            <h4 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Elegí el día y horario
            </h4>

            <div className="flex justify-center mb-4 gap-4">
                <button
                    onClick={() => setSemanaOffset((prev) => prev - 1)}
                    disabled={semanaOffset < -1}
                    className={`px-4 py-2 rounded-lg shadow transition-colors
                            ${semanaOffset < -1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-orange-200 text-orange-800 hover:bg-orange-300'}`}>
                    ← Semana anterior
                </button>
                

                <button
                    onClick={() => setSemanaOffset((prev) => prev + 1)}
                    disabled={semanaOffset >= 8}
                    className={`px-4 py-2 rounded-lg shadow transition-colors
                            ${semanaOffset >= 8
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-orange-200 text-orange-800 hover:bg-orange-300'}`}
                >
                    Semana siguiente →
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fechas.map((fecha, i) => {
                    const fechaStr = fecha.toISOString().split("T")[0];
                    const clave = `${fechaStr}_${especialidad}`;
                    const horariosOcupados = horariosReservadosPorFecha[clave] || new Set();

                    return (
                        <div key={i} className="p-4 border rounded-xl shadow bg-white">
                            <h5 className="font-semibold text-blue-700 mb-2">
                                {formatearFecha(fecha)}
                            </h5>
                            <div className="flex gap-2 flex-wrap">
                                {horariosDisponibles.map((hora) => {
                                    const horaStr = `${String(hora).padStart(2, "0")}:00:00`;
                                    const deshabilitado =
                                        esHorarioPasado(fecha, hora) ||
                                        horariosOcupados.has(horaStr) ||
                                        turnosPropios.has(`${fechaStr}_${especialidad}_${horaStr}`);

                                    const seleccionado =
                                        turnoSeleccionado?.fecha === fecha.toDateString() &&
                                        turnoSeleccionado?.hora === hora;

                                    return (
                                        <button
                                            key={hora}
                                            onClick={() => seleccionarTurno(fecha, hora)}
                                            disabled={deshabilitado}
                                            className={`py-1.5 px-4 rounded-full text-sm font-medium transition-all border
                            ${deshabilitado
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : seleccionado
                                                        ? "bg-green-500 text-white border-green-600 shadow"
                                                        : "bg-orange-200 text-orange-800 hover:bg-orange-300 border-orange-300"
                                                }`}>
                                            {hora}:00
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {turnoSeleccionado && (
                <div className="mt-6 text-center">
                    <p className="text-lg text-green-700 font-medium mb-4">
                        Elegiste el turno para <span className="font-semibold">{especialidad}</span> el{" "}
                        <strong>{formatearFecha(new Date(turnoSeleccionado.fecha))}</strong> a las{" "}
                        <strong>{turnoSeleccionado.hora}:00</strong>
                    </p>
                    <div className=" flex justify-center flex space-x-4">
                        <button
                            onClick={cancelarSeleccion}
                            className="bg-red-200 hover:bg-red-400 py-2 px-5 rounded-xl text-sm font-semibold shadow-md">
                            Cancelar seleccion
                        </button>

                        <button
                            onClick={confirmarTurno}
                            className="bg-green-500 hover:bg-green-400 py-2 px-5 rounded-xl text-sm font-semibold shadow-md">
                            Confirmar turno
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendario;
