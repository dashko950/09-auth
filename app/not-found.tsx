import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 140px)",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "6rem", color: "#667eea", marginBottom: "1rem" }}>
        404
      </h1>
      <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "1rem" }}>
        Page Not Found
      </h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: "#667eea",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          textDecoration: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#764ba2")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#667eea")
        }
      >
        Go back home
      </Link>
    </div>
  );
}
