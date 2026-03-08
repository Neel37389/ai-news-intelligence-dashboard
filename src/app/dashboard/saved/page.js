"use client";

import { useContext } from "react";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { articles } from "@/data/articles";
import { ArticleItem } from "@/components/ArticleItem";
import { Button } from "@/components/ui/button";

export default function SavedPage() {
  const { savedIds, setSavedIds } = useContext(SavedArticlesContext);

  const toggleSave = (id) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const savedArticles = articles.filter((articels) =>
    savedIds.includes(articels.id),
  );

  const handleClear = () => setSavedIds([]);

  return (
    <div>
      {savedArticles.length === 0 ? (
        <p>No saved articels yet.</p>
      ) : (
        <div>
          <div>
            <Button onClick={handleClear}>CLear All</Button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedArticles.map((item) => (
              <ArticleItem
                key={item.id}
                item={item}
                savedIds={savedIds}
                toggleSave={toggleSave}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
