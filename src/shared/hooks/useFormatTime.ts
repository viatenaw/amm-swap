export const formatTime = (time: number): string => {
    let days = Math.floor(time / 86400);
    let hours = Math.floor((time % (3600 * 24)) / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    if (days >= 1) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    if (hours >= 1) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes >= 1) {
      return `${minutes}m ${seconds}s`;
    }
    if (seconds >= 1) {
      return `${seconds}s`;
    }
    return "";
  };