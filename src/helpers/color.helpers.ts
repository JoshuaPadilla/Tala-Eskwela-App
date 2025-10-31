export const getSchedTimeStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "#ABE7B2";
    case "ongoing":
      return "#FFF9BD";
    case "ended":
      return "#FF8F8F";
    default:
      return "#ABE7B2";
  }
};
