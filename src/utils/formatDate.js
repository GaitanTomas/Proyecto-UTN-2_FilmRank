export const getYear = (dateString) => {
  return dateString ? new Date(dateString).getFullYear() : "–";
};