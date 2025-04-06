import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/"; // Default to home page if no next parameter

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the deployed site (weiverai.vercel.app) after successful login
      const baseURL = "https://weiverai.vercel.app"; // Replace with your production URL
      return NextResponse.redirect(`${baseURL}${next}`);
    }
  }

  // Redirect to error page if authentication fails
  const errorURL = "https://weiverai.vercel.app/error"; // Replace with your error page URL
  return NextResponse.redirect(errorURL);
}
