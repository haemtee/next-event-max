import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EvenList from "../../components/events/event-list";
import EvenSearch from "../../components/events/events-search";

const EventsPage = (props) => {
  const allEvents = props.events;

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

export const getStaticProps = async (context) => {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
};

export default EventsPage;
