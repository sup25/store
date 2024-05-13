"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthUser(WrappedComponent) {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };
}
