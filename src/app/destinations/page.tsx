import DestinationCard from "@/components/DestinationCard";

interface IDataType {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const AllUserDestination = async () => {
  const res = await fetch("http://localhost:8000/destinations");
  const data: IDataType[] = await res.json();
  //   console.log(data, "from all user data");

  return (
    <div className="container mx-auto my-15 space-y-5">
      <h3 className="text-6xl font-semibold">Explore All Destinations</h3>
      <p className="text-xl">
        Find your perfect travel experience from our curated collection
      </p>
      <div className="grid grid-cols-3 gap-10">
        {data.map((singleData) => (
          <DestinationCard key={singleData._id} destination={singleData} />
        ))}
      </div>
    </div>
  );
};

export default AllUserDestination;
