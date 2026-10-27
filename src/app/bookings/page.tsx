import MybookingsList from "@/components/booking/MybookingsList";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface IBookingType {
  _id: string;
  userName: string;
  email: string;
  image: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  bookingDate: string;
}

const myBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  //   console.log("user information", user);
  const res = await fetch(`http://localhost:8000/mybookings/${user?.email}`);
  const booking: IBookingType[] = await res.json();
  console.log(booking);

  return (
    <div className="container mx-auto my-10 space-y-5">
      <div>
        <h4 className="text-5xl font-bold">My Bookings</h4>
        <p className="text-lg">Manage and view your upcoming travel plans</p>
      </div>
      <div className="grid gap-10">
        {booking.map((myBooking) => (
          <div key={myBooking._id}>
            <MybookingsList myBooking={myBooking} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default myBookingsPage;
