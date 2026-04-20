import { fetchNotes } from "@/lib/api/serverApi";
import FilterSidebar from "./page";

export default async function SidebarDefault() {
  try {
    const notes = await fetchNotes();
    return <FilterSidebar initialNotes={notes} />;
  } catch {
    return <FilterSidebar initialNotes={[]} />;
  }
}
