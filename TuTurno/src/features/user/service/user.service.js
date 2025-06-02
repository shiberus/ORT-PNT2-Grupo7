import { supabase } from "../../../auth/supabaseAuth"
import useUserStore from "../../../stores/useUserStore"

export const loadUserData = async ({ isSignUp = false, user = null } = {}) => {
    const store = useUserStore.getState()

    // 1. Si es un nuevo usuario (signUp), seteamos user y limpiamos favoritos
    if (isSignUp) {
        console.log({user})
        if (!user) {
            const { data, error } = await supabase.auth.getUser()
            if (error || !data?.user) {
              console.log({error, data})
                throw new Error("No se pudo obtener el usuario recién registrado.")
            }
            user = data.user;
        }

        store.setUser(user)
        store.setTurnos([])

        return {
            message: "¡Bienvenido! Solo tenés que validar tu email.",
            favoriteIds: [],
            user: user
        }
    }

    // 2. Buscar user actual si no se pasa explícitamente
    let currentUser = user

    if (!currentUser) {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
            throw new Error("No se pudo obtener el usuario actual.")
        }
        currentUser = data.user
    }

    // 3. Setear user en el store
    store.setUser(currentUser)

    
    // 4. Traer favoritos desde Supabase
    const { data: turnos, error: turnosError } = await supabase
    .from("turnos")
    .select("*")
    .eq("user_id", currentUser.id)
    
    console.log({currentUser, turnos})
    if (turnosError) {
        console.error("Error al traer turnos:", turnosError.message)
        throw new Error("No se pudieron cargar las recetas favoritas")
    }

    store.setTurnos(turnos);

    return {
        message: `¡Hola ${currentUser.email}! Se cargaron tus recetas favoritas.`,
        user: currentUser
    }
}
