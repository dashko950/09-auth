"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, clearIsAuthenticated, setUser } =
    useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      setUser(null);
      queryClient.clear();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={styles.navigationItem}>
          <Link
            href="/profile"
            className={styles.navigationLink}
            prefetch={false}
          >
            Profile
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <p className={styles.userEmail}>{user.email}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={styles.navigationItem}>
        <Link
          href="/sign-in"
          className={styles.navigationLink}
          prefetch={false}
        >
          Login
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link
          href="/sign-up"
          className={styles.navigationLink}
          prefetch={false}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
