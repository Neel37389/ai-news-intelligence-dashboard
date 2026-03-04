"use client";

import { useState } from "react";

export default function ArticlesPage() {
  const [saved, setSaved] = useState([]);
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
    if (saved.includes(id)) setSaved(saved.filter((item) => item !== id));
    else {
      setSaved([...saved, id]);
    }
  };

  return (
    <div>
      <ul>
        {articles.map((item) => {
          return (
            <li key={item.id}>
              <div>
                <h1>{item.title}</h1>
                <p>{item.source}</p>
              </div>
              <button onClick={() => toggleSave(item.id)}>
                {saved.includes(item.id) ? "Saved" : "Save"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
