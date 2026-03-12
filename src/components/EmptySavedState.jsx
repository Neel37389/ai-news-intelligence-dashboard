"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export const EmptySavedState = () => {
  return (
    <Card className="rounded-lg border border-border bg-card">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-base">
            No saved articles yet
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Start bookmarking articles to see them here.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="/dashboard/articles">
          <Button
            variant="secondary"
            className="group-hover:bg-accent transition-colors"
          >
            Browse Articles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
