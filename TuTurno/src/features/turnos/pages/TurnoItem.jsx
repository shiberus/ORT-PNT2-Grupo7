import styles from "./TurnoItem.module.css";

const TurnoItem = ({ fecha, horario }) => {
  return (
    <div className={styles.card}>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Horario:</strong> {horario}</p>
    </div>
  );
};

export default TurnoItem;