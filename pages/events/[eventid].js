import {
  EventContent,
  EventSummary,
  EventLogistics,
} from "../../components/event-detail";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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

export const getStaticProps = async (context) => {
  const eventId = context.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventid: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
};
