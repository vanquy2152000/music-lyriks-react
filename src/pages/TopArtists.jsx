import { useSelector } from "react-redux";
import { ArtistCard, Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Songs Around You" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard track={track} key={track.key} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;