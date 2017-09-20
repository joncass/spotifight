import React from 'react'

import {
  Segment,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

const TrackMatchup = ({
  tracks
}) => (
  <Segment.Group horizontal>
    <Segment>
      <TrackPlayer
        track={tracks[0]}
      />
    </Segment>
    <Segment>
      <TrackPlayer
        track={tracks[1]}
      />
    </Segment>
  </Segment.Group>
)

export default TrackMatchup
