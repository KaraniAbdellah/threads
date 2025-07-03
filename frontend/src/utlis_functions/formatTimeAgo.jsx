const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days === 0 && hours === 0) return `${minutes}m`;
  if (days === 0) return `${hours}h ${minutes}m`;
  if (hours === 0) return `${days}d ${minutes}m`;

  return `${days}d ${hours}h ${minutes}m`;
};

export default formatTimeAgo;
