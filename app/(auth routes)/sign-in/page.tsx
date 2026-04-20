"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import styles from "./styles/SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);
      setUser(user);
      router.push("/profile");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.mainContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.formTitle}>Sign in</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
