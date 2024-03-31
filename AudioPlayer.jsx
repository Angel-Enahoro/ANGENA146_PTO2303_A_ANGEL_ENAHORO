import { useState } from "react";
import PropTypes from "prop-types";

function AudioPlayer({
  currentEpisode,
  isPlaying,
  togglePlay,
  playbackProgress,
}) {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const handleConfirmationYes = () => {
    togglePlay(false); // Pause the audio
    setIsConfirmationDialogOpen(false); // Close the confirmation dialog
    // Close the page
    window.close();
  };

  const handleConfirmationNo = () => {
    setIsConfirmationDialogOpen(false); // Close the confirmation dialog
  };

  return (
    <div>
      {/* Audio player controls */}
      <div>
        {/* Display current episode information and playback progress */}
        <p>Current Episode: {currentEpisode}</p>
        <p>Playback Progress: {playbackProgress}</p>
        {/* Toggle play/pause button */}
        <button onClick={() => togglePlay(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      {/* Close confirmation dialog */}
      {isConfirmationDialogOpen && (
        <div>
          <p>
            Are you sure you want to close the page? Your audio is still
            playing.
          </p>
          <button onClick={handleConfirmationYes}>Yes</button>
          <button onClick={handleConfirmationNo}>No</button>
        </div>
      )}
    </div>
  );
}

AudioPlayer.propTypes = {
  currentEpisode: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  playbackProgress: PropTypes.string.isRequired,
};

export default AudioPlayer;
