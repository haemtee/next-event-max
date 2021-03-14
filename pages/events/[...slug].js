import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../helpers/api-util";
import ResultTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const EventSlugPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://projectku-c1efa-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
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
    numMonth > 12 ||
    error
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

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2025 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // lakukan ini jika ada error page
//       // redirect: {
//       //   destination: "/error"
//       // }
//     };
//   }

//   const filteredEvent = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: { filteredEvent, date: { year: numYear, month: numMonth } },
//   };
// };

export default EventSlugPage;
