"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Provider } from "@supabase/supabase-js";

// Generalized OAuth sign-in function
const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const siteUrl = process.env.SITE_URL; // Fallback for safety
  const auth_callback_url = `${siteUrl}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    // Pass error message to the error page for better UX
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  redirect(data.url);
};

// Specific Google sign-in action
const signinWithGoogle = signInWith("google");

// Sign-out action with redirect and revalidation
const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout"); // Refresh cache for the root layout
  redirect("/"); // Redirect to homepage after sign-out
};

export { signinWithGoogle, signOut };
