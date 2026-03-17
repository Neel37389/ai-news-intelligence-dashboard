"use client";

import { articles } from "@/data/articles";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { useContext } from "react";

export default function DashboardHome() {
  const { savedIds } = useContext(SavedArticlesContext);
  const totalSavedArticles = savedIds.length;
  const savedArticles = articles.filter((article) =>
    savedIds.includes(article.id),
  );
  const savedSources = savedArticles.map((article) => article.source);
  const uniqueSources = [...new Set(savedSources)];
  const allTopics = savedArticles.flatMap((article) => article.tags);
  const topicCount = {};
  allTopics.forEach((topic) => {
    topicCount[topic] = (topicCount[topic] || 0) + 1;
  });
  let topTopic = "None";
  let max = 0;

  for (const topic in topicCount) {
    if (topicCount[topic] > max) {
      max = topicCount[topic];
      topTopic = topic;
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Saved Articles</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {totalSavedArticles}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Sources</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {uniqueSources.length === 0
            ? "None"
            : uniqueSources.map((source) => (
                <span
                  key={source}
                  className="px-2 py-1 text-xs rounded-md bg-muted"
                >
                  {source}
                </span>
              ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Topics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-md bg-muted">
            {topTopic}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
