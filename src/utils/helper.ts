export const getContentVersion = () => {
  return import.meta.env.MODE === "development" ? "draft" : "published";
};
