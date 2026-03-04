"use client";

import { useState } from "react";

export default function ArticlesPage() {
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

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const ArticleList = ({ item, savedIds, toggleSave }) => {
    return (
      <li>
        <div>
          <h1>{item.title}</h1>
          <p>{item.source}</p>
        </div>
        <button onClick={() => toggleSave(item.id)}>
          {savedIds.includes(item.id) ? "Saved" : "Save"}
        </button>
      </li>
    );
  };

  return (
    <div>
      <input
        className="bg-muted"
        placeholder="enter title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <ul>
        {filteredArticles.map((item) => {
          return (
            <ArticleList
              key={item.id}
              item={item}
              savedIds={savedIds}
              toggleSave={toggleSave}
            />
          );
        })}
      </ul>
    </div>
  );
}

const toggleItem = (item) => {
  if (item.includes(item)) {
    setItems(items.filter((i) => i !== item));
  } else {
    setItems([...items, item]);
  }
};
