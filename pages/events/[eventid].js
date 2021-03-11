import { useRouter } from "next/router";

import {
  EventContent,
  EventSummary,
  EventLogistics,
} from "../../components/event-detail";
import { getEventById } from "../../dummy-data";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p> No event found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Browse all Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p> {event.description} </p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
