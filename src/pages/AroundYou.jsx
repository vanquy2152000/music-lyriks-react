import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_QCvP70aj6JSEB0rLUGPGJVqm8sVhB"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading Songs Around You" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>:
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            data={data}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
