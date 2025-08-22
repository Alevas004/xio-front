export const formatDate = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return date;
  };