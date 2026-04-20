import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem", color: "#667eea" }}>
        404
      </h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#667eea",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
