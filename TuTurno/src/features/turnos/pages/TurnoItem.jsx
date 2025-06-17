import styles from "./TurnoItem.module.css";

const TurnoItem = ({ turno_id, fecha, horario, especialidad, onCancel}) => {
  return (
    <div className={`${styles.card} relative`}>
      <button
        onClick={() => onCancel(turno_id)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm font-semibold transition"
      >
        ❎Cancelar
      </button>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Horario:</strong> {horario}</p>
      <p><strong>Especialidad:</strong> {especialidad}</p>
    </div>
  );
};

export default TurnoItem;