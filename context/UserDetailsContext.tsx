"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../utils/supabase/client";
import { getUserDetails } from "../db/profiles";

// Define the shape of your user details
interface UserDetails {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  tokens: number;
  plan: string;
}

// Define the context type
interface UserDetailsContextType {
  userDetails: UserDetails | null;
  setUserDetails: (user: UserDetails | null) => void;
}

// Create the context
export const UserDetailsContext = createContext<
  UserDetailsContextType | undefined
>(undefined);

// Provider component
export function UserDetailsProvider({ children }: { children: ReactNode }) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    // Fetch user session and then details
    async function fetchUserDetails() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const userDetails = await getUserDetails({ userId: session.user.id });
        setUserDetails(userDetails);
      }
    }
    fetchUserDetails();
  }, []);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}
