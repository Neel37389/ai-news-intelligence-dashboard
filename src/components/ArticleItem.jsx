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

export const ArticleItem = ({ item, savedIds, toggleSave }) => {
  const formatedDate = new Date(item.publishedAt).toLocaleDateString();
  return (
    <Card className="transition hover:shadow-md h-full flex flex-col group">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{item.title}</CardTitle>
          {savedIds.includes(item.id) && (
            <Badge variant="secondary" className="shrink-0">
              Saved
            </Badge>
          )}
        </div>
        <CardDescription>{`Source: ${item.source} • ${formatedDate}`}</CardDescription>
      </CardHeader>
      <CardContent>{item.summary}</CardContent>
      <CardFooter className="mt-auto">
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
