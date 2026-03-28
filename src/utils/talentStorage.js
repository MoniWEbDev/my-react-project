const TALENT_STORAGE_KEY = 'kachrabeche_talent_uploads';
const MAX_TALENT_ITEMS = 80;

export const getTalentUploads = () => {
  try {
    const raw = localStorage.getItem(TALENT_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const saveTalentUpload = (entry) => {
  const existing = getTalentUploads();
  const updated = [entry, ...existing].slice(0, MAX_TALENT_ITEMS);
  localStorage.setItem(TALENT_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateTalentUpload = (id, updates) => {
  const existing = getTalentUploads();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  localStorage.setItem(TALENT_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteTalentUpload = (id) => {
  const existing = getTalentUploads();
  const updated = existing.filter((item) => item.id !== id);
  localStorage.setItem(TALENT_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearTalentUploads = () => {
  localStorage.removeItem(TALENT_STORAGE_KEY);
};

export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
