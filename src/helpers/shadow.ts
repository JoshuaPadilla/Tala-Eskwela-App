export const shadow = (platform: string) => {
  return platform === "ios"
    ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }
    : { elevation: 4 };
};
