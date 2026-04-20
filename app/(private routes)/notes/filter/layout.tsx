export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div style={{ flex: "1" }}>{sidebar}</div>
      <div style={{ flex: "3" }}>{children}</div>
    </div>
  );
}
