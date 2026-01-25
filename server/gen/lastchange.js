export const canChangePassword = (lastChangedAt) => {
  if (!lastChangedAt) return true;

  const now = new Date();
  const diffHours = (now - lastChangedAt) / (1000 * 60 * 60);

  return diffHours >= 24;
};
