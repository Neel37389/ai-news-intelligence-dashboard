"use client";

import { ArticleItem } from "./ArticleItem";
import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/api";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export const ArticlesClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await fetch("/api/saved-articles");
      const data = await res.json();
      const normalized = (data.data || []).map((item) => ({
        ...item,
        id: item.article_id,
      }));
      setSavedArticles(normalized);
    };
    fetchSaved();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    router.push(`/dashboard/articles?q=${encodeURIComponent(searchTerm)}`);
  };

  const query = searchParams.get("q");
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchArticles(query);
      setArticles(data);
      setLoading(false);
    };
    fetchData();
    setSearchTerm(query);
  }, [query]);

  const toggleSave = async (item) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.log("Not logged in");
      return;
    }
    const exists = savedArticles.some((a) => a.id === item.id);
    if (exists) {
      await fetch("/api/save-article", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_id: item.id,
          user_id: user.id, // ✅ REQUIRED
        }),
      });
      setSavedArticles((prev) => prev.filter((a) => a.id !== item.id));
    } else {
      await fetch("/api/save-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          user_id: user.id, // ✅ REQUIRED
        }),
      });
      setSavedArticles((prev) => [...prev, item]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search */}
      <div className="relative max-w-md flex gap-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9 bg-muted border-border focus-visible:ring-primary"
          placeholder="Search by title or source"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search Article"}
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="space-y-3 p-4 border rounded-lg">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-9 w-24 mt-2" />
            </li>
          ))}
        </ul>
      ) : articles.length === 0 && searchTerm.trim() !== "" ? (
        <div className="flex items-center justify-center h-40 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">
            No results for <span className="font-medium">{searchTerm}</span>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
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
