export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 140px)",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e5e7eb",
            borderTopColor: "#667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 1rem",
          }}
        />
        <p style={{ color: "#666" }}>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
