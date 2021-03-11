import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EvenList from "../../components/events/event-list";
import EvenSearch from "../../components/events/events-search";

const EventsPage = () => {
  const allEvents = getAllEvents();

  const router = useRouter();

  function filteredEvents(year, month) {
    const filteredPath = `events/${year}/${month}`;
    return router.push(filteredPath);
  }

  return (
    <>
      <EvenSearch filteredHandle={filteredEvents} />
      <EvenList items={allEvents} />
    </>
  );
};

export default EventsPage;
