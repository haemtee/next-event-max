import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";
import ResultTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const EventSlugPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <>
        <ErrorAlert>
          <p>Loading data...</p>
        </ErrorAlert>
      </>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2025 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter value... please provide correct filter value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Browse all events</Button>
        </div>
      </>
    );
  }

  const filteredEvent = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvent || filteredEvent.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Event found on this filtered date!!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Browse all events</Button>
        </div>
      </>
    );
  }

  const dateFilter = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={dateFilter} />
      <EventList items={filteredEvent} />
    </>
  );
};

export default EventSlugPage;
