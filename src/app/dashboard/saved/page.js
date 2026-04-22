"use client";

import { ArticleItem } from "@/components/ArticleItem";
import { Button } from "@/components/ui/button";
import { EmptySavedState } from "@/components/EmptySavedState";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SavedPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setArticles([]);
        return;
      }

      const res = await fetch(`/api/saved-articles?user_id=${user.id}`);
      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        setArticles([]);
        return;
      }

      setArticles(
        (data.data || []).map((item) => ({
          ...item,
          id: item.article_id,
          publishedAt: item.published_at,
        })),
      );
    };

    fetchSaved();
  }, []);

  const toggleSave = async (item) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await fetch("/api/save-article", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article_id: item.id,
        user_id: user.id,
      }),
    });
    setArticles((prev) => prev.filter((a) => a.id !== item.id));
  };

  const handleClear = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const res = await fetch("/api/save-article", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      return;
    }
    setArticles([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-end items-center mb-6">
        {articles.length > 0 && (
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
        )}
      </div>
      {articles.length === 0 ? (
        <EmptySavedState className="mt-4" />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => {
            const mappedItem = {
              ...item,
              id: item.article_id,
              publishedAt: item.published_at,
            };

            return (
              <ArticleItem
                key={mappedItem.id}
                item={mappedItem}
                savedArticles={articles}
                toggleSave={toggleSave}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
