import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSearchMultiQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSearchMultiQuery(searchTerm);
  console.log("check data ", data);
  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (isFetching) return <Loader title="Loading Search" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing result for <span className="font-black">{searchTerm}</span>:
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
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

export default Search;
