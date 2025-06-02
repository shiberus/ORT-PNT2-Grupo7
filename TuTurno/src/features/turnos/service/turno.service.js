import { supabase } from "../../../auth/supabaseAuth"

export const fetchAllTurnosById = async (ids) => {
    if (!ids || ids.length === 0) return []

    const { data, error } = await supabase
        .from("turnos")
        .select("*")
        .in("id", ids)

    if (error) {
        console.error("Error al obtener turnos por IDs:", error)
        throw error
    }

    return data
}