import useUserStore from '../../../stores/useUserStore'
import styles from './Profile.module.css'
import TurnoItem from '../../turnos/pages/TurnoItem'
import { useTiempoParaProximoTurno } from '../../../hooks/useTiempoParaProximoTurno'
import { useNavigate } from 'react-router'

const Profile = () => {
    const {
      user,
      turnos,
      turnosError,
      removeTurno
    } = useUserStore()
    const tiempoRestante = useTiempoParaProximoTurno(turnos);
    const navigate = useNavigate();
    
    if (!user) return <p>Debes iniciar sesión para ver tu perfil.</p>

      const handleCancelTurno = (turnoId) => {
    if (confirm("¿Estás seguro de que querés cancelar este turno?")) {
      removeTurno(turnoId);
    }
  };
  return (
    <div className={styles.profileContainer}>
      <h2>Mi Perfil</h2>
      <div className={styles.profileInfo}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tiempo para el próximo turno:</strong> {tiempoRestante ?? 'Sin turnos próximos'}</p>

        <h3>⭐ Mis turnos</h3>
        {turnosError && <p style={{ color: 'red' }}>{turnosError}</p>}

        {turnos.length === 0 ? (
          <p>No tenés reservado ningún turno.</p>
        ) : (
          <div className={styles.turnoGrid}>
            {turnos.map((turno) => (
              <TurnoItem key={turno.turno_id} {...turno} onCancel={handleCancelTurno} />
            ))}
          </div>
        )}
      </div>
      
      <button onClick={() => navigate('/')} className="mt-6 bg-orange-200 hover:bg-orange-300 text-orange-800 font-semibold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
        Solicitar nuevo turno
      </button>
    </div>
  )
}

export default Profile;
