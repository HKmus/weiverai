import React from "react";
import { signOut } from "../(auth)/actions";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <button onClick={signOut}>signout</button>
    </>
  );
}
