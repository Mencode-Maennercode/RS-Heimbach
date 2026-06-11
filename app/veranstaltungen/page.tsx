import { getCalendarEvents } from "@/lib/calendar";
import VeranstaltungenView from "./VeranstaltungenView";

// Termine werden beim statischen Build aus der Nextcloud-.ics geholt und
// eingebacken. Aktualisierung erfolgt ueber den geplanten Rebuild (GitHub Action).
export default async function VeranstaltungenPage() {
  const events = await getCalendarEvents();
  return <VeranstaltungenView events={events} />;
}
