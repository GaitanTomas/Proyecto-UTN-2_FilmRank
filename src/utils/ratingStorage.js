const STORAGE_KEY = "filmrank_ratings";

export const getRatedItems = () => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error leyendo los items calificados en localStorage:", error);
    return [];
  }
};

export const isItemRated = (itemId) => {
  const items = getRatedItems();
  return items.some((item) => item.id === itemId);
};

export const getRatedItem = (itemId) => {
  const items = getRatedItems();
  return items.find((item) => item.id === itemId) || null;
};

export const saveRatedItem = (ratedItem) => {
  try {
    const items = getRatedItems();
    const existingIndex = items.findIndex((item) => item.id === ratedItem.id);

    if (existingIndex > -1) {
      items[existingIndex] = ratedItem;
    } else {
      items.push(ratedItem);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error guardando los items calificados en localStorage:", error);
  }
};

export const removeRatedItem = (itemId) => {
  try {
    let items = getRatedItems();
    items = items.filter((item) => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error eliminando el item calificado de localStorage:", error);
  }
};
