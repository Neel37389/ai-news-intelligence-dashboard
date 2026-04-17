import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatTimeAgo } from "@/lib/dateUtils";
import { useState } from "react";

export const ArticleItem = ({ item, savedArticles, toggleSave }) => {
  const formatedDate = formatTimeAgo(item.publishedAt);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const text = `
    Title: ${item.title}
    Description: ${item.summary}
    `;
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setAiSummary(data.summary);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card border-border hover:border-accent transition hover:shadow-lg h-full flex flex-col group">
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="line-clamp-2 text-base">
                {item.title}
              </CardTitle>

              {savedArticles.some((a) => a.id === item.id) && (
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-accent text-accent-foreground"
                >
                  Saved
                </Badge>
              )}
            </div>

            <CardDescription className="text-muted-foreground text-xs">
              {`${item.source} • ${formatedDate}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            <div className="flex gap-2 flex-wrap">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-muted text-accent-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {item.summary}
          </CardContent>

          <CardFooter className="mt-auto pt-4 justify-between">
            <Button
              variant="secondary"
              className="group-hover:bg-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(item);
              }}
            >
              {savedArticles.some((a) => a.id === item.id) ? "Unsave" : "Save"}
            </Button>
            <Button
              variant="secondary"
              className="group-hover:bg-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.id, "_blank");
              }}
            >
              Read Full Article
            </Button>
            <Button onClick={handleSummarize}>Summarize</Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-w-xl">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{`${item.source} • ${formatedDate}`}</DialogDescription>
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-muted text-accent-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.summary}
        </p>
        <div className="space-y-2">
          <Button
            variant="secondary"
            onClick={handleSummarize}
            disabled={loading || aiSummary}
          >
            {loading
              ? "Generating..."
              : aiSummary
                ? "Summary Generated"
                : "Summarize with AI"}
          </Button>

          {/* Loading */}
          {loading && (
            <p className="text-sm text-muted-foreground">
              Generating summary...
            </p>
          )}

          {/* AI result */}
          {aiSummary && (
            <div className="p-3 rounded-lg bg-muted text-sm leading-relaxed">
              {aiSummary}
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          className="transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(item);
          }}
        >
          {savedArticles.some((a) => a.id === item.id) ? "Unsave" : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
