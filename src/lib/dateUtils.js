export function formatTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minutes${minutes === 1 ? "" : "s"} ago`;
  }

  if (minutes < 24) {
    return `${hours} hours${hours === 1 ? "" : "s"} ago`;
  }

  return `${days} day${days === 1 ? "" : "s"} ago`;
}
