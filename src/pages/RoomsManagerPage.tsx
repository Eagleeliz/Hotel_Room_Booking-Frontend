import { useParams } from "react-router-dom";
import RoomsManager from "../components/AdminDashboard/RoomsManager";

const RoomsManagerPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  if (!hotelId) return <div>Invalid hotel ID</div>;

  return (
    <div className="pt-24 px-4">
      <RoomsManager hotelId={parseInt(hotelId)} />
    </div>
  );
};

export default RoomsManagerPage;
