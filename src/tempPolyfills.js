// TODO: Remove this file once the below issue is sorted out
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

export default raf