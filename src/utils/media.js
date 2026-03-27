const apiOrigin =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "http://localhost:5000";

export const mediaUrl = (relativePath) => {
  if (!relativePath) return null;
  const path = String(relativePath).replace(/^\//, "");
  return `${apiOrigin}/${path}`;
};
