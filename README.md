[![Build Status](https://travis-ci.org/joncass/spotifight.svg?branch=master)](https://travis-ci.org/joncass/spotifight) [![Coverage Status](https://coveralls.io/repos/github/joncass/spotifight/badge.svg?branch=master)](https://coveralls.io/github/joncass/spotifight?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/joncass/spotifight.svg)](https://greenkeeper.io/)

# spotifight
## Synopsis
In each matchup, choose a favorite between two songs. At the end, you'll have a winner!

## Live app
Coming soon!

## Usage
### Initial
Clone the repository:
```
git clone https://github.com/joncass/spotifight.git
```

### Start
Move into the directory and start the app
```
cd spotifight
npm run start
```

### Tests
Run tests with or without coverage
```
npm run test
npm run coverage
```

## Server
Longer term I would like to put the `server/index.js` logic onto a server. For now, I run it locally with Node, and check in the `data` files it generates. It cannot be run from the browser because it requires Spotify developer credentials, which should not be exposed client-side. If you want to generate your own `data` files, sign up for a [Spotify developer account](developer.spotify.com), and create a `secrets/spotifyWebAPI.js` with contents
```
exports.clientId = [YOUR CLIENT ID]
exports.clientSecret = [YOUR CLIENT SECRET]
```
and then run
```
node server
```

## Technologies
Built using:
- [React](https://reactjs.org/) (in particular, [create-react-app](https://github.com/facebookincubator/create-react-app))
- [Semantic UI React](https://react.semantic-ui.com/introduction)
- [react-sound](https://www.npmjs.com/package/react-sound)
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)

Testing and CI/CD with:
- [jest](https://facebook.github.io/jest/)
- [enzyme](https://github.com/airbnb/enzyme)
- [Travis](travis-ci.org)
- [Coveralls](coveralls.io)

## License
MIT License

## Contributing
Contributions welcome! I don't have a contributing guide (yet), but feel free to open an issue if you have a suggestion for a change and/or would like to make a pull request.
NB: I will be looking for 100% test coverage.
