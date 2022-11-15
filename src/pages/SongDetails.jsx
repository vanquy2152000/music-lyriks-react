import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid, id: artistId } = useParams();
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  console.log("Song data", data);

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-10">
        <h2 className=" text-white text-2xl font-bold">Lyrics: </h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i  }>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        handlePlayClick={handlePlayClick}
        handlePauseClick={() => handlePauseClick(song, index)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </div>
  );
};

export default SongDetails;
