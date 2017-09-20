import React from 'react'

import TrackPlayer from './TrackPlayer'

const TrackMatchup = ({
  tracks
}) => (
  <div>
    <TrackPlayer
      track={tracks[0]}
    />
    <TrackPlayer
      track={tracks[1]}
    />
  </div>
)

export default TrackMatchup
