import { supabase } from "@/utils/supabase/client";

export async function createWorkspace({
  userId,
  messages,
}: {
  userId: string;
  messages: any;
}) {
  try {
    const { data } = await supabase
      .from("workspace")
      .insert([{ messages, user_id: userId }])
      .select("id")
      .single();

    return data?.id;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getWorkspace({ workSpaceId }: { workSpaceId: string }) {
  try {
    const { data } = await supabase
      .from("workspace")
      .select("*")
      .eq("id", workSpaceId)
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function updateMessages({
  workSpaceId,
  messages,
}: {
  workSpaceId: string;
  messages: any;
}) {
  try {
    const { data } = await supabase
      .from("workspace")
      .update({ messages: messages })
      .eq("id", workSpaceId)
      .select()
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function updateFiles({
  workSpaceId,
  files,
}: {
  workSpaceId: string;
  files: any;
}) {
  try {
    const { data } = await supabase
      .from("workspace")
      .update({ files_data: files })
      .eq("id", workSpaceId)
      .select()
      .single();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getAllWorkspaces({ userId }: { userId: string }) {
  try {
    const { data } = await supabase
      .from("workspace")
      .select("id, messages, modified_at")
      .eq("user_id", userId);

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function deleteWorkspace({
  workSpaceId,
}: {
  workSpaceId: string;
}) {
  try {
    const { error } = await supabase
      .from("workspace")
      .delete()
      .eq("id", workSpaceId);

    if (error) {
      console.error("Error deleting workspace:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
