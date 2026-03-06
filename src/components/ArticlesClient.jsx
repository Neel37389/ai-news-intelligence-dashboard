"use client";

import { ArticleItem } from "./ArticleItem";
import { useContext } from "react";
import { articles } from "@/data/articles";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const ArticlesClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { savedIds, setSavedIds } = useContext(SavedArticlesContext);

  const toggleSave = (id) => {
    if (savedIds.includes(id))
      setSavedIds((prev) => prev.filter((item) => item !== id));
    else {
      setSavedIds((prev) => [...prev, id]);
    }
  };

  const term = searchTerm.trim().toLowerCase();

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(term) ||
      article.source.toLowerCase().includes(term),
  );

  return (
    <div>
      <div className=" relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="bg-muted pl-9"
          placeholder="Search by title or source"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>
      {filteredArticles.length === 0 && searchTerm.trim() !== "" ? (
        <p>{`No results for ${searchTerm}`}</p>
      ) : (
        <ul className="items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((item) => {
            return (
              <ArticleItem
                key={item.id}
                item={item}
                savedIds={savedIds}
                toggleSave={toggleSave}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
