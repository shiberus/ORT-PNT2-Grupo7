import styles from "./TurnoItem.module.css";

const TurnoItem = ({ fecha, horario, especialidad}) => {
  return (
    <div className={styles.card}>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Horario:</strong> {horario}</p>
      <p><strong>Especialidad:</strong> {especialidad}</p>
    </div>
  );
};

export default TurnoItem;