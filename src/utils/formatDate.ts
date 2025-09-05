export const formatDate = (dateString: string) => {
  // Si la fecha es null, undefined o vacía
  if (!dateString) return "Fecha no disponible";

  // Varias estrategias según el formato
  let date;

  try {
    if (dateString.includes("T")) {
      // Formato ISO: "2025-10-05T00:00:00.000Z" o similar
      const dateOnly = dateString.split("T")[0]; // "2025-10-05"
      const [year, month, day] = dateOnly.split("-").map(Number);
      date = new Date(year, month - 1, day);
    } else if (dateString.includes("-") && dateString.length === 10) {
      // Formato: "2025-10-05"
      const [year, month, day] = dateString.split("-").map(Number);
      date = new Date(year, month - 1, day);
    } else {
      // Fallback para otros formatos
      date = new Date(dateString);
    }

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const formatted = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted;
  } catch {
    return "Error en fecha";
  }
};
