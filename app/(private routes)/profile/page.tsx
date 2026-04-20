"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./styles/ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1 className={styles.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={styles.avatarWrapper}>
          <Image
            src={
              user.avatar || "https://www.gravatar.com/avatar/placeholder?d=mp"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>
        <div className={styles.profileInfo}>
          <p>Username: {user.username || "Not set"}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
