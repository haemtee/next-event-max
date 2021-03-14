import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const MainPage = (props) => {
  const { featuredEvents } = props;
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default MainPage;

export const getStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();
  // console.log(featuredEvents);
  return {
    props: { featuredEvents },
    revalidate: 1800,
  };
};
