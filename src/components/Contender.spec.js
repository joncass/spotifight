import React from 'react'
import Enzyme, { mount } from 'enzyme'

import {
  Button,
} from 'semantic-ui-react'

import Contender from './Contender'
import TrackPlayer from './TrackPlayer'

describe('Contender', () => {
  let contender, track, onChoose, onPlay

  beforeEach(() => {
    track = {
      artist: 'some artist',
      imageURL: 'http://image.url.com',
      name: 'some name',
      url: 'http://some.url.com',
    }

    onChoose = jest.fn()
    onPlay = jest.fn()

    contender = mount(
      <Contender
        onChoose={onChoose}
        onPlay={onPlay}
        track={track}
      />
    )
  })

  it('renders a TrackPlayer', () => {
    const trackPlayer = contender.find(TrackPlayer)
    expect(trackPlayer.props().track).toEqual(track)
  })

  it('passes onPlay to its TrackPlayer', () => {
    expect(onPlay).not.toHaveBeenCalled()
    contender.find(TrackPlayer).props().onPlay()
    expect(onPlay).toHaveBeenCalledTimes(1)
  })

  it('renders a Button that calls onChoose when clicked', () => {
    const heartButton = contender.find(Button).first()

    expect(onChoose).not.toHaveBeenCalled()
    heartButton.simulate('click')
    expect(onChoose).toHaveBeenCalledTimes(1)
  })

  it('calls the TrackPlayer pause when pause is called', () => {
    const trackPlayerPause = jest.fn()
    contender.instance().refs.trackPlayer.pause = trackPlayerPause

    expect(trackPlayerPause).not.toHaveBeenCalled()
    contender.instance().pause()
    expect(trackPlayerPause).toHaveBeenCalledTimes(1)
  })
})
