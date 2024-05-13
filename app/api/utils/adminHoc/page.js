"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthAdmin(WrappedComponent) {
  return (props) => {
    const { admin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!admin) {
        router.push("/");
      }
    }, [admin, router]);

    return <WrappedComponent {...props} />;
  };
}
