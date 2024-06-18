import React, { useEffect, useState } from "react";
import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  Player,
  PlayToggle,
} from "video-react";
import "video-react/dist/video-react.css";

const VideoPlayer = ({
  src,
  onPlayerChange = () => {},
  onChange = () => {},
  startTime = undefined,
}) => {
  const [player, setPlayer] = useState(undefined);
  const [playerState, setPlayerState] = useState(undefined);

  useEffect(() => {
    if (playerState) {
      onChange(playerState);
    }
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player);

    if (player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player]);

  return (
    <div className={"w-[400px] border border-gray-500 shadow-2xl rounded-2xl"}>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        startTime={startTime}
      >
        <source className="video-enabled-player" src={src} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={false} disableDefaultControls={true}>
          <PlayToggle />
        </ControlBar>
      </Player>
    </div>
  );
};

export default VideoPlayer;
