"use client";

import { useState } from "react";
import { ArticleItem } from "./ArticleItem";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const ArticlesClient = () => {
  const [savedIds, setSavedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const articles = [
    {
      id: 1,
      title: "AI Breakthrough in Medical Diagnosis",
      source: "TechCrunch",
    },
    {
      id: 2,
      title: "Open-Source LLMs Gaining Enterprise Adoption",
      source: "The Verge",
    },
    {
      id: 3,
      title: "How AI Is Transforming Financial Markets",
      source: "Bloomberg",
    },
  ];

  const toggleSave = (id) => {
    if (savedIds.includes(id))
      setSavedIds(savedIds.filter((item) => item !== id));
    else {
      setSavedIds([...savedIds, id]);
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
          className="bg-muted"
          placeholder="     seach by title or source"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>
      {filteredArticles.length === 0 && searchTerm.trim() !== "" ? (
        <p>{`No results for ${searchTerm}`}</p>
      ) : (
        <ul className="space-y-4 items-start grid gitd-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
