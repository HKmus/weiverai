import { supabase } from "@/utils/supabase/client";

export async function checkPromoCode({
  promoCode,
}: {
  promoCode: string;
}): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("promo_codes")
      .select("id") // Select only the id to optimize performance
      .eq("code", promoCode)
      .eq("is_active", true)
      .single();

    if (error || !data) return false; // If there's an error or no data, return false

    return true; // If data exists, return true
  } catch (error) {
    console.error("Error checking promo code:", error);
    return false; // Return false in case of an exception
  }
}
