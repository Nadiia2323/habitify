"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  createdAt: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        setCurrentUser(null);
        router.push("/login");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          setCurrentUser(null);
          router.push("/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.log("Fetch error:", error);
        router.push("/login");
      }
    };
    getUser();
  }, [router]);

  if (currentUser === null) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <p>Hello my friend</p>
      <p>{currentUser.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
