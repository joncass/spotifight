import { fetchTrackData } from './data'

describe('fetchTrackData', () => {
  it('returns a promise that resolves to an object of data', () => {
    expect.assertions(4)
    return fetchTrackData().then(data => {
      // Check that the first track in four of the genres has the
      // right properties
      expect(
        data.chill[0].name
        && data.chill[0].url
        && data.chill[0].imageURL
        && data.chill[0].artist
      ).toBeTruthy()

      expect(
        data.focus[0].name
        && data.focus[0].url
        && data.focus[0].imageURL
        && data.focus[0].artist
      ).toBeTruthy()

      expect(
        data.mood[0].name
        && data.mood[0].url
        && data.mood[0].imageURL
        && data.mood[0].artist
      ).toBeTruthy()

      expect(
        data.rock[0].name
        && data.rock[0].url
        && data.rock[0].imageURL
        && data.rock[0].artist
      ).toBeTruthy()
    })
  })
})