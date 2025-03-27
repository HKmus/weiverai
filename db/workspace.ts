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

// export async function addMessage(userId, role, message) {
//   const workspace = await getWorkspace(userId);
//   if (!workspace) return null;

//   const newMessages = [...workspace.messages, { role, message }];

//   const { data, error } = await supabase
//     .from("workspace")
//     .update({ messages: newMessages })
//     .eq("user_id", userId)
//     .select()
//     .single();

//   if (error) {
//     throw error;
//   }
//   return data;
// }

// export async function clearWorkspace(userId: string) {
//
//   const { data, error } = await supabase
//     .from("workspace")
//     .update({ messages: [] })
//     .eq("user_id", userId)
//     .select()
//     .single();

//   if (error) {
//     throw error;
//   }
//   return data;
// }
