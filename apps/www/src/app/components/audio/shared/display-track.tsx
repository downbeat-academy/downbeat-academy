import { getSanityUrl } from "@utils/getSanityUrl";
import { Text } from "@components/text";

export const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  trackIndex,
  tracks,
  showTitle = false,
  showArtist = false,
}) => {
  const track = getSanityUrl(currentTrack.file.asset._ref);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    console.log(audioRef)
  };


  return (
    <div>
      <audio
        src={track}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div>
        {showTitle &&
          <Text
            tag='p'
            size='body-base'
            type='productive-body'
            color='high-contrast'
            collapse
          >{currentTrack.title}</Text>
        }
        {showArtist &&
          <Text
            tag='p'
            size='body-base'
            type='productive-body'
            color='high-contrast'
            collapse
          >{currentTrack.artist}</Text>
        }
        {tracks.length > 1 && (
          <Text tag='p' size='body-base' type='productive-body' color='high-contrast'>{trackIndex + 1} / {tracks.length}</Text>
        )}
      </div>
    </div>
  )
}