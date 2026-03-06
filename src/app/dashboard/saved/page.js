"use client";

import { useContext } from "react";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { articles } from "@/data/articles";
import { ArticleItem } from "@/components/ArticleItem";

export default function SavedPage() {
  const { savedIds, setSavedIds } = useContext(SavedArticlesContext);

  const toggleSave = (id) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const savedArticels = articles.filter((articels) =>
    savedIds.includes(articels.id),
  );

  return (
    <div>
      {savedArticels.lenght === 0 ? (
        <p>No saved articels yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedArticels.map((item) => (
            <ArticleItem
              key={item.id}
              item={item}
              savedIds={savedIds}
              toggleSave={toggleSave}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
