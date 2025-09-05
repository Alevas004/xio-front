

export const formatDateInYears = (dateString: string): string => {
  const date = new Date(dateString);
  const years = new Date().getFullYear() - date.getFullYear();
  return `${years} años`;
};
