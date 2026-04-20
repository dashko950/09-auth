"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      const privateRoutes = ["/profile", "/notes"];
      const isPrivateRoute = privateRoutes.some((route) =>
        pathname?.startsWith(route),
      );

      if (isPrivateRoute) {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          router.push("/sign-in");
        }
      }
      setIsLoading(false);
    };

    verifySession();
  }, [pathname, router, setUser]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
