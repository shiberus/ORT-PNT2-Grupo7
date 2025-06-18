import { useEffect, useState } from "react";
import EspecialidadSelector from "../EspecialidadesSelector/EspecialidadSelector";
import useUserStore from "../../stores/useUserStore";
//import { Link } from "react-router"; 
import Calendario from "../Calendario/Calendario";
import { Link, useLocation } from "react-router-dom"

const Home = () => {
const user = useUserStore((state) => state.user);
const [especialidad, setEspecialidad] = useState(null);
const [turno, setTurno] = useState(null);

const location = useLocation();

useEffect(() => {
  if (location.pathname === "/") {
    setEspecialidad(null);
    setTurno(null); // opcional, si querés reiniciar el turno también
  }
}, [location.pathname]);

return (
<div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full text-center">
    {!user ? (
        <>
        <h1 className="text-3xl font-bold text-blue-600 mb-4">¡Bienvenido a TuTurno! 💙</h1>
        <p className="mb-6 text-gray-600">Registrate o iniciá sesión para sacar un turno</p>
        <div className="flex justify-center gap-4">
            <Link to="/signup">
            <button className="bg-orange-200 text-orange-900 py-2 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-orange-300 transition-all">Registrarme</button>
            </Link>
            <Link to="/signin">
            <button className="bg-orange-200 text-orange-900 py-2 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-orange-300 transition-all">Login</button>
            </Link>
        </div>
        </>
    ) : (
        <>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Hola {user.email} 👋</h2>
        {!especialidad ? (
            <EspecialidadSelector onSelect={setEspecialidad} />
        ) : (
            <>
            <h3 className="text-xl font-medium mb-4">Especialidad seleccionada: <span className="text-blue-600">{especialidad}</span></h3>
            <Calendario onSelect={setTurno} especialidad={especialidad} onVolver={() => setEspecialidad(null)}/>
            </>
        )}
        </>
    )}
    </div>
</div>
);
};

export default Home;

