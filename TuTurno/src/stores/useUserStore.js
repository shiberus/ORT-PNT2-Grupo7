import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../auth/supabaseAuth";

const useUserStore = create(
  persist(
    (set, get) => ({
      // --- ESTADO GLOBAL ---
      user: null,
      turnos: [],
      loadingTurnos: false,
      turnosError: null,

      // --- SETTERS ---
      setUser: (user) => set({ user }),
      setTurnos: (turnos) => set({ turnos }),

      // --- ACCIONES ---
      addTurno: async (fecha, horario) => {
        const { user, turnos } = get();

        if (!user) {
          console.warn("Usuario no logueado.");
          return;
        }

        try {
          // Insertar en Supabase
          const {
            error: insertError,
            data: [turnoNuevo],
          } = await supabase
            .from("turnos")
            .insert([{ user_id: user.id, fecha, horario }], {
              returning: "representation",
            });

          if (insertError) throw insertError;
          set({
            turnos: [...turnos, ...turnoNuevo],
          });
        } catch (error) {
          console.error("Error al agregar turno:", error);
        }
      },

      removeTurno: async (turnoId) => {
        const { user, turnos } = get();
        const numericId = Number(turnoId);
        const turnoIds = turnos.map((t) => t.id);

        if (!user) {
          console.warn("Usuario no logueado.");
          return;
        }

        const existsInStore = turnoIds.includes(numericId);
        if (!existsInStore) {
          console.log("No está en favoritos del store.");
          return;
        }

        try {
          // Verificar si existe en Supabase
          const { error: deleteError } = await supabase
            .from("turnos")
            .delete()
            .eq("user_id", user.id)
            .eq("turno_id", numericId);

          if (deleteError) throw deleteError;

          // Actualizar estado local
          set({
            turnos: turnos.filter((r) => Number(r.id) !== numericId),
          });
        } catch (error) {
          console.error("Error al eliminar favorito:", error);
        }
      },

      // --- RESET TOTAL ---
      reset: () =>
        set({
          user: null,
          turnos: [],
          loadingTurnos: false,
          turnosError: null,
        }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        turnos: state.turnos,
      }),
    }
  )
);

export default useUserStore;
