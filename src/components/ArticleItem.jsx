import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const ArticleItem = ({ item, savedIds, toggleSave }) => {
  return (
    <Card className="transition hover:shadow-md h-full flex flex-col group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.title}</CardTitle>
          {savedIds.includes(item.id) && (
            <Badge variant="secondary">Saved</Badge>
          )}
        </div>
        <CardDescription>{`Source: ${item.source}`}</CardDescription>
      </CardHeader>
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
