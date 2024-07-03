"use client";
import Spinner from "@/common/spinner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthAdmin(WrappedComponent) {
  return (props) => {
    const { admin, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && !admin) {
        router.push("/");
      }
    }, [admin, isInitializing, router]);

    if (isInitializing) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
}
