"use client";
import Spinner from "@/common/spinner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthUser(WrappedComponent) {
  return (props) => {
    const { user, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && !user) {
        router.push("/");
      }
    }, [user, isInitializing, router]);

    if (isInitializing) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
}
