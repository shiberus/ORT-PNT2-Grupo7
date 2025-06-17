const especialidades = [
"Clínica Médica",
"Cardiología",
"Dermatología",
"Pediatría",
"Ginecología",
"Neurología",
"Traumatología",
"Otorrinolaringología",
"Oftalmología",
"Urología",
"Endocrinología",
"Gastroenterología",
"Alergología",
"Psiquiatría",
"Reumatología"
];

const EspecialidadSelector = ({ onSelect }) => {

return (
    <div className="text-center">
        <h3 className="text-xl font-semibold text-blue-600 mb-6">Elegí una especialidad:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {especialidades.map((e) => (
            <button
            key={e}
            onClick={() => onSelect(e)}
            className="bg-orange-200 hover:bg-orange-300 text-orange-800 font-medium py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
            {e}
            </button>
        ))}
        </div>
    </div>
);
};

export default EspecialidadSelector;
