import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Sound from 'react-sound'

import {
  Button,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

Enzyme.configure({ adapter: new Adapter() })

describe('TrackPlayer', () => {
  let trackPlayer, track, onPlay

  beforeEach(() => {
    onPlay = jest.fn()
    track = {
      url: 'http://some.url.com',
    }

    trackPlayer = mount(
      <TrackPlayer
        onPlay={onPlay}
        track={track}
      />
    )
  })

  it('renders a Sound component', () => {
    const soundComponent = trackPlayer.find(Sound)
    expect(soundComponent).toHaveLength(1)
    expect(soundComponent.props().url).toBe(track.url)
  })

  it('renders a ButtonGroup with play, pause, and stop buttons', () => {
    const buttonGroup = trackPlayer.find(Button.Group)
    expect(buttonGroup).toHaveLength(1)

    const buttons = buttonGroup.find(Button)
    expect(buttons).toHaveLength(3)

    const buttonIcons = buttons.map(button => button.props().icon)
    expect(buttonIcons).toEqual([ 'play', 'pause', 'stop' ])
  })

  it('calls play when you press the play button', () => {
    const playFn = jest.fn()
    trackPlayer.instance().play = playFn
    const playButton = trackPlayer.find(Button.Group).find(Button).at(0)

    expect(playFn).not.toHaveBeenCalled()
    playButton.simulate('click')
    expect(playFn).toHaveBeenCalledTimes(1)
  })

  it('calls onPlay when play is called', () => {
    expect(onPlay).not.toHaveBeenCalled()
    trackPlayer.instance().play()
    expect(onPlay).toHaveBeenCalledTimes(1)
  })

  it('calls pause when you press the pause button', () => {
    const pauseFn = jest.fn()
    trackPlayer.instance().pause = pauseFn
    const pauseButton = trackPlayer.find(Button.Group).find(Button).at(1)

    expect(pauseFn).not.toHaveBeenCalled()
    pauseButton.simulate('click')
    expect(pauseFn).toHaveBeenCalledTimes(1)
  })

  it('calls stop when you press the stop button', () => {
    const stopFn = jest.fn()
    trackPlayer.instance().stop = stopFn
    const stopButton = trackPlayer.find(Button.Group).find(Button).at(2)

    expect(stopFn).not.toHaveBeenCalled()
    stopButton.simulate('click')
    expect(stopFn).toHaveBeenCalledTimes(1)
  })

  it('alters state when the buttons are pressed', () => {
    expect(trackPlayer.instance().state.playStatus).toBe('STOPPED')
    trackPlayer.find(Button.Group).find(Button).at(0).simulate('click')
    expect(trackPlayer.instance().state.playStatus).toBe('PLAYING')
    trackPlayer.find(Button.Group).find(Button).at(1).simulate('click')
    expect(trackPlayer.instance().state.playStatus).toBe('PAUSED')
    trackPlayer.find(Button.Group).find(Button).at(2).simulate('click')
    expect(trackPlayer.instance().state.playStatus).toBe('STOPPED')
  })
})
