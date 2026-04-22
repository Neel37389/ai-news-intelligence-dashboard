export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { ArticlesClient } from "@/components/ArticlesClient";

export default function ArticlesPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesClient />
      </Suspense>
    </div>
  );
}
