import { signOut } from "../(auth)/actions";
import { Button } from "@/components/ui/button";
import Chat from "@/components/chat/Chat";


export default function Dashboard() {
  return (
    <>
      <Button onClick={signOut}>Sign Out</Button>
      <Chat />
    </>
  );
}
