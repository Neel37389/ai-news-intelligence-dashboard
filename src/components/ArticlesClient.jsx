"use client";

import { useState } from "react";
import { ArticleItem } from "./ArticleItem";

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
      <input
        className="bg-muted"
        placeholder="enter title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      {filteredArticles.length === 0 && searchTerm.trim() !== "" ? (
        <p>{`No results for ${searchTerm}`}</p>
      ) : (
        <ul>
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
