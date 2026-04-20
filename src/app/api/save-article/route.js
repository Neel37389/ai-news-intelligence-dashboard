import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const article = {
      article_id: body.id,
      title: body.title,
      source: body.source,
      summary: body.summary,
      published_at: body.publishedAt, // important
      tags: body.tags,
      user_id: "temp-user", // add this for now
    };

    const { data, error } = await supabase
      .from("saved_articles")
      .insert([article]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const article_id = searchParams.get("id");

    if (article_id) {
      const { error } = await supabase
        .from("saved_articles")
        .delete()
        .eq("article_id", article_id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Deleted One" });
    }
    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .neq("article_id", "");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Deleted All" });
  } catch (err) {
    return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
  }
}
