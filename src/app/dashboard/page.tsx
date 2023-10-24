"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated
    fetch("/api/auth")
      .then((response) => response.json())
      .then((data) => {
        if (data !== "Authenticated") {
          // If not authenticated, redirect to login
          router.push("/admin/login");
        }
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
};

export default ProtectedPage;
