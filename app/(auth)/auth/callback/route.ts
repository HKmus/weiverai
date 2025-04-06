import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const origin = url.origin;

  if (code) {
    const supabase = await createClient(); // no need for `await` here
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";

      const redirectTo = isLocal
        ? `${origin}${next}`
        : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`;

      return NextResponse.redirect(redirectTo);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
