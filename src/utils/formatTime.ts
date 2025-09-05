export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const ampm = +hours >= 12 ? "PM" : "AM";
  const formattedHours = ((+hours + 11) % 12 + 1).toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${ampm}`;
};
