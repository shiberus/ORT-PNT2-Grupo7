import useUserStore from '../../../stores/useUserStore'
import styles from './Profile.module.css'
import TurnoItem from '../../turnos/pages/TurnoItem'
import { useTiempoParaProximoTurno } from '../../../hooks/useTiempoParaProximoTurno'

const Profile = () => {
  const {
    user,
    turnos,
    turnosError
  } = useUserStore()
  const tiempoRestante = useTiempoParaProximoTurno(turnos);

  if (!user) return <p>Debes iniciar sesión para ver tu perfil.</p>

  return (
    <div className={styles.profileContainer}>
      <h2>Mi Perfil</h2>
      <div className={styles.profileInfo}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tiempo para el próximo turno:</strong> {tiempoRestante ?? 'Sin turnos próximos'}</p>

        <h3>⭐ Mis turnos</h3>
        {turnosError && <p style={{ color: 'red' }}>{turnosError}</p>}

        <div className={styles.turnoGrid}>
          {turnos.map((turno) => (
            <TurnoItem key={turno.turno_id} {...turno} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
