import React, { createContext, useState, useCallback, useEffect } from "react";
import { getRatedItems, saveRatedItem, removeRatedItem } from "../utils/ratingStorage";

export const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [ratedItems, setRatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const items = getRatedItems();
    setRatedItems(items);
    setLoading(false);
  }, []);

  // Add or update a rating
  const addRating = useCallback((item, userRating) => {
    const ratedItem = {
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date || item.first_air_date,
      vote_average: item.vote_average,
      userRating,
      type: item.title ? "movie" : "tv",
      addedAt: new Date().toISOString(),
    };

    saveRatedItem(ratedItem);
    setRatedItems((prev) => {
      const exists = prev.some((i) => i.id === ratedItem.id);
      if (exists) {
        return prev.map((i) => (i.id === ratedItem.id ? ratedItem : i));
      }
      return [...prev, ratedItem];
    });

    return ratedItem;
  }, []);

  // Remove a rating
  const removeRating = useCallback((itemId) => {
    removeRatedItem(itemId);
    setRatedItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Check if an item is rated
  const isRated = useCallback((itemId) => {
    return ratedItems.some((item) => item.id === itemId);
  }, [ratedItems]);

  // Get a specific rating
  const getRating = useCallback(
    (itemId) => {
      return ratedItems.find((item) => item.id === itemId) || null;
    },
    [ratedItems]
  );

  const value = {
    ratedItems,
    loading,
    addRating,
    removeRating,
    isRated,
    getRating,
  };

  return (
    <RankingContext.Provider value={value}>
      {children}
    </RankingContext.Provider>
  );
};