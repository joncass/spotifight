import React from 'react'
import Enzyme, { mount } from 'enzyme'

import App, { POOL_SIZE } from './App'

describe('App', () => {
  let app

  beforeEach(() => {
    app = mount(<App />)
  })

  it('renders without crashing', () => {
    expect(app).toBeTruthy()
  })

  it('has POOL_SIZE tracks in its state', () => {
    expect.assertions(1)
    return app.instance().initialized.then(() => {
      expect(app.instance().state.tournamentTracks).toHaveLength(POOL_SIZE)
    })
  })
})