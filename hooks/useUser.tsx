'use client'
import { editUser, getCurrentUser } from "@/app/actions/user";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

type UserContextType = {
   user: User | null;
   updateUser: (user: User, updateAddress?: boolean, onSuccess?: () => void) => Promise<void>;
   status: "authenticated" | "loading" | "none";
}

const UserContext = createContext<UserContextType | null>(null);

export default function useUser () {
   const ctx = useContext(UserContext);
   if (!ctx) throw new Error("UserProvider is missing");
   return ctx;
};

export function UserProvider ({ children }: { children: React.ReactNode }) {
   const { data: session } = useSession();
   const [user, setUser] = useState<User | null>(null);
   const [status, setStatus] = useState<UserContextType['status']>("loading");

   async function getUser() {
      const user = await getCurrentUser();
      if (user) {
         setUser(user);
         setStatus("authenticated");
      } else {
         setUser(null);
         setStatus("none");
      }
      return user;
   }

   async function updateUser (user: User, updateAddress?: boolean, onSuccess?: () => void) {
      const updatedUserInformation = user;
      const updatedUser = await editUser(updatedUserInformation, updateAddress || false);
      if (updatedUser) {
         toast.success("Updated!");
         setUser(prev => ({ ...prev, ...user }));
         if (onSuccess) onSuccess();
      } else {
         toast.error("Failed to update")
      }
   }

   useEffect(() => { getUser() }, [session]);

   return (
      <UserContext.Provider value={{ updateUser, user, status }}>
         {children}
      </UserContext.Provider>
   );
};


// export default function useUser (): useUserReturn {
//    const [user, setUser] = useState<User | null>(null);
//    const [status, setStatus] = useState<useUserReturn['status']>("loading");

//    async function getUser() {
//       const user = await getCurrentUser();
//       if (user) {
//          setUser(user);
//          setStatus("authenticated");
//       } else {
//          setUser(null);
//          setStatus("none");
//       }
//       return user;
//    }

//    async function updateUser (user: User) {
//       setUser(prev => ({ ...prev, ...user }));
//    }

//    useEffect(() => { getUser() }, []);

//    return { user, updateUser, status };
// }
