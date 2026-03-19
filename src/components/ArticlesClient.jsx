"use client";

import { ArticleItem } from "./ArticleItem";
import { useContext, useState, useEffect } from "react";
import { fetchArticles } from "@/lib/api";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const ArticlesClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  const toggleSave = (item) => {
    const exists = savedArticles.some((a) => a.id === item.id);

    if (exists) {
      setSavedArticles((prev) => prev.filter((a) => a.id !== item.id));
    } else {
      setSavedArticles((prev) => [...prev, item]);
    }
  };

  const term = searchTerm.trim().toLowerCase();

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(term) ||
      article.source.toLowerCase().includes(term) ||
      article.summary.toLowerCase().includes(term),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-9 bg-muted border-border focus-visible:ring-primary"
          placeholder="Search by title or source"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Empty state */}
      {filteredArticles.length === 0 && searchTerm.trim() !== "" ? (
        <div className="flex items-center justify-center h-40 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">
            No results for <span className="font-medium">{searchTerm}</span>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((item) => (
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
};
