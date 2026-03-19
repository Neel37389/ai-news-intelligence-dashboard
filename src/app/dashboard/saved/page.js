"use client";

import { useContext } from "react";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { ArticleItem } from "@/components/ArticleItem";
import { Button } from "@/components/ui/button";
import { EmptySavedState } from "@/components/EmptySavedState";

export default function SavedPage() {
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);

  const toggleSave = (item) => {
    setSavedArticles((prev) => prev.filter((a) => a.id !== item.id));
  };

  const handleClear = () => setSavedArticles([]);

  console.log(savedArticles);
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-end items-center mb-6">
        {savedArticles.length > 0 && (
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
        )}
      </div>
      {savedArticles.length === 0 ? (
        <EmptySavedState className="mt-4" />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((item) => (
            <ArticleItem
              key={item.id}
              item={item}
              savedArticles={savedArticles}
              toggleSave={toggleSave}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
