import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  handlePlayClick,
  handlePauseClick,
  isPlaying,
  activeSong,
  artistId,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            artistId={artistId}
            i={i}
            handlePlayClick={handlePlayClick}
            handlePauseClick={handlePauseClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
