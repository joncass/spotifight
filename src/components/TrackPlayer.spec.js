import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import Sound from 'react-sound'
import TrackPlayer from './TrackPlayer'

describe('TrackPlayer', () => {
  let trackPlayer, track, onPlay

  beforeEach(() => {
    onPlay = jest.fn()
    track = {
      url: 'http://some.url.com'
    }

    trackPlayer = shallow(
      <TrackPlayer
        onPlay={onPlay}
        track={track}
      />
    )
  })

  it('renders a Sound component', () => {
    console.log(track)
    const soundComponent = trackPlayer.find(Sound)
    expect(soundComponent).toHaveLength(1)
    expect(soundComponent.props().url).toBe(track.url)
  })

  // it('renders a ButtonGroup with play, pause, and stop buttons', () => {
  //
  // })
  //
  // it('calls play when you press the play button', () => {
  //
  // })
  //
  // it('calls onPlay when play is called', () => {
  //
  // })
  //
  // it('calls pause when you press the pause button', () => {
  //
  // })
  //
  // it('calls stop when you press the stop button', () => {
  //
  // })
})
