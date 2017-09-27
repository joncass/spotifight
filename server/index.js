const fs = require('fs')
const rimraf = require('rimraf')
const SpotifyWebApi = require('spotify-web-api-node')

const apiSecrets = require('../secrets/spotifyWebAPI')
const spotifyApi = new SpotifyWebApi(apiSecrets)

const IGNORE_CATEGORIES = [
  'comedy',
  'toplists',
  'sleep',
  'inspirational',
]

const DATA_FILE_FOLDER = 'src/data/'
const DATA_FILE_SUFFIX = '.js'

rimraf.sync(DATA_FILE_FOLDER)
fs.mkdirSync(DATA_FILE_FOLDER)

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

                  fs.writeFileSync(
                    DATA_FILE_FOLDER + category.id + DATA_FILE_SUFFIX,
                    'export default ' + JSON.stringify(trackData)
                  )
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