"use client";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function DashboardHome() {
  const [savedArticles, setSavedArticles] = useState([]);
  const totalSavedArticles = savedArticles.length;
  const saveArticles = savedArticles;
  const savedSources = saveArticles.map((article) => article.source);
  const uniqueSources = [...new Set(savedSources)];
  const allTopics = saveArticles.flatMap((article) => article.tags);

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

  const topicData = Object.entries(topicCount)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const chartConfig = {
    count: {
      label: "Articles",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Saved Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Articles</CardTitle>
        </CardHeader>

        <CardContent className="text-3xl font-semibold">
          {totalSavedArticles}
        </CardContent>
      </Card>

      {/* Sources */}
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

      {/* Top Topic */}
      <Card>
        <CardHeader>
          <CardTitle>Top Topic</CardTitle>
        </CardHeader>

        <CardContent>
          <span className="px-2 py-1 text-xs rounded-md bg-muted">
            {topTopic}
          </span>
        </CardContent>
      </Card>

      {/* Topic Breakdown */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Topic Breakdown</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Desktop Chart */}
          <div className="hidden md:block">
            <ChartContainer config={chartConfig} className="h-[320px] w-full">
              <BarChart
                data={topicData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid horizontal={false} />

                <XAxis type="number" allowDecimals={false} />

                <YAxis dataKey="topic" type="category" width={140} />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-2">
            {topicData.length === 0 ? (
              <p className="text-sm text-muted-foreground">No topics yet</p>
            ) : (
              topicData.map((item) => (
                <div
                  key={item.topic}
                  className="flex justify-between items-center rounded-md bg-muted px-3 py-2 text-sm"
                >
                  <span>{item.topic}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
