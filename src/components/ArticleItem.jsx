import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

import { Button } from "./ui/button";

export const ArticleItem = ({ item, savedIds, toggleSave }) => {
  return (
    <Card className="transition hover:shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{`Source: ${item.source}`}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button onClick={() => toggleSave(item.id)}>
          {savedIds.includes(item.id) ? "Saved" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};
