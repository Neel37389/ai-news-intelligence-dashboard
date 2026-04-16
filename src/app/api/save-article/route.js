import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("BODY", body);

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

    console.log("DB ERROR:", error);
    console.log("DATA:", data);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.log("CATCH ERROR", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
