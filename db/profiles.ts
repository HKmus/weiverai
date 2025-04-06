import { supabase } from "@/utils/supabase/client";

export async function getUserDetails({ userId }: { userId: string }) {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function updateTokenCount({
  userId,
  tokenCount,
}: {
  userId: string;
  tokenCount: number;
}) {
  try {
    const { data } = await supabase
      .from("profiles")
      .update({ tokens: tokenCount })
      .eq("id", userId)
      .select()
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function upgradeUserSubscription({
  userId,
}: {
  userId: string;
}) {
  try {
    const { data } = await supabase
      .from("profiles")
      .update({ plan: "pro" })
      .eq("id", userId)
      .select()
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}
