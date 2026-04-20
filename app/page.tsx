import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to NoteHub</h1>
        <p className={styles.subtitle}>
          Your personal space for organizing thoughts, ideas, and tasks
        </p>
        <div className={styles.ctaButtons}>
          <a href="/sign-up" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="/sign-in" className={styles.secondaryButton}>
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
}
