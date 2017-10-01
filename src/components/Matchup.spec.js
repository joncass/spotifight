import React from 'react'
import Enzyme, { mount } from 'enzyme'

import Contender from './Contender'
import Matchup from './Matchup'

describe('Matchup', () => {
  let matchup, contenders, onChooseContender

  beforeEach(() => {
    contenders = [
      {
        artist: 'some artist',
        imageURL: 'http://image.url.com',
        name: 'some name',
        url: 'http://some.url.com',
      },
      {
        artist: 'some other artist',
        imageURL: 'http://image.otherurl.com',
        name: 'some other name',
        url: 'http://some.otherurl.com',
      },
    ]

    onChooseContender = jest.fn()

    matchup = mount(
      <Matchup
        onChooseContender={onChooseContender}
        contenders={contenders}
      />
    )
  })

  it('renders two Contenders', () => {
    const contenderComps = matchup.find(Contender)
    expect(contenderComps).toHaveLength(2)
  })

  it('passes the first track to the first Contender', () => {
    const firstContender = matchup.find(Contender).first()
    expect(firstContender.props().track).toEqual(contenders[0])
  })

  it('passes the second track to the second Contender', () => {
    const secondContender = matchup.find(Contender).last()
    expect(secondContender.props().track).toEqual(contenders[1])
  })

  it('passes onChoose prop to firstContender appropriately', () => {
    const firstContender = matchup.find(Contender).first()

    expect(onChooseContender).not.toHaveBeenCalled()
    firstContender.props().onChoose()
    expect(onChooseContender).toHaveBeenCalledTimes(1)
    expect(onChooseContender).toHaveBeenCalledWith(0)
  })

  it('passes onChoose prop to secondContender appropriately', () => {
    const secondContender = matchup.find(Contender).last()

    expect(onChooseContender).not.toHaveBeenCalled()
    secondContender.props().onChoose()
    expect(onChooseContender).toHaveBeenCalledTimes(1)
    expect(onChooseContender).toHaveBeenCalledWith(1)
  })

  it('pauses each contender when other is played', () => {
    expect(
      matchup.instance().refs.firstContender.refs.trackPlayer.state.playStatus
    ).toBe('STOPPED')
    expect(
      matchup.instance().refs.secondContender.refs.trackPlayer.state.playStatus
    ).toBe('STOPPED')

    matchup.instance().refs.firstContender.refs.trackPlayer.play()

    expect(
      matchup.instance().refs.firstContender.refs.trackPlayer.state.playStatus
    ).toBe('PLAYING')
    expect(
      matchup.instance().refs.secondContender.refs.trackPlayer.state.playStatus
    ).toBe('PAUSED')

    matchup.instance().refs.secondContender.refs.trackPlayer.play()

    expect(
      matchup.instance().refs.firstContender.refs.trackPlayer.state.playStatus
    ).toBe('PAUSED')
    expect(
      matchup.instance().refs.secondContender.refs.trackPlayer.state.playStatus
    ).toBe('PLAYING')
  })
})
