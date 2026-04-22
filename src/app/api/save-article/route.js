import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(req) {
  try {
    const body = await req.json();

    const article = {
      article_id: body.id,
      title: body.title,
      source: body.source,
      summary: body.summary,
      published_at: body.publishedAt,
      tags: body.tags,
      user_id: body.user_id,
    };

    const { data, error } = await supabase
      .from("saved_articles")
      .insert([article]);

    if (error) {
      console.error("POST ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { article_id, user_id } = body;
    if (article_id) {
      const { error } = await supabase
        .from("saved_articles")
        .delete()
        .eq("article_id", article_id)
        .eq("user_id", user_id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Deleted One" });
    }
    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .eq("user_id", user_id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Deleted All" });
  } catch (err) {
    return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
  }
}
