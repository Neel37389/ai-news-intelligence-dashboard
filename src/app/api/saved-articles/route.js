import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { data, error } = await supabase.from("saved_articles").select("*");
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
