const SpotifyWebApi = require('spotify-web-api-node')

const apiSecrets = require('../secrets/spotifyWebAPI')
const spotifyApi = new SpotifyWebApi(apiSecrets)

const IGNORE_CATEGORIES = [
  'comedy',
  'toplists',
  'sleep',
  'inspirational',
]

spotifyApi.clientCredentialsGrant().then(
  data => {
    spotifyApi.setAccessToken(data.body['access_token'])

    spotifyApi.getCategories({
      country: 'US',
      locale: 'en_US'
    }).then(
      data => {
        data.body.categories.items.filter(
          category => (IGNORE_CATEGORIES.indexOf(category.id) === -1)
        ).forEach(category => {
          spotifyApi.getPlaylistsForCategory(category.id, {
            country: 'US',
            limit: 1,
          }).then(
            data => {
              const playlist = data.body.playlists.items[0]

              spotifyApi.getPlaylistTracks('spotify', playlist.id).then(
                data => {
                  const tracks = data.body.items
                  const trackData = tracks.map(
                    track => ({
                      name: track.track.name,
                      url: track.track.preview_url,
                      imageURL: track.track.album.images[0].url,
                      artist: track.track.artists[0].name,
                    })
                  ).filter(track => (track.url))
                  console.log({
                    category: category.id,
                    tracks: trackData,
                  })
                  console.log(',')
                },
                err => {
                  console.log('Error retrieving tracks for playlist:', err)
                }
              )
            },
            err => {
              console.log('Error retrieving playlist for category:', err)
            }
          )

        })
      },
      err => {
        console.log('Error retrieving categories:', err)
      }
    )
  },
  err => {
    console.log('Error retrieving access token:', err.message)
  }
)