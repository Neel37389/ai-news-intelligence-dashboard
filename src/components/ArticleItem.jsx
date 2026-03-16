import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatTimeAgo } from "@/lib/dateUtils";

export const ArticleItem = ({ item, savedIds, toggleSave }) => {
  const formatedDate = formatTimeAgo(item.publishedAt);

  return (
    <Card className="bg-card border-border hover:border-accent transition hover:shadow-lg h-full flex flex-col group">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-base">{item.title}</CardTitle>

          {savedIds.includes(item.id) && (
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

      <CardFooter className="mt-auto pt-4">
        <Button
          variant="secondary"
          className="group-hover:bg-accent transition-colors"
          onClick={() => toggleSave(item.id)}
        >
          {savedIds.includes(item.id) ? "Unsave" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};
