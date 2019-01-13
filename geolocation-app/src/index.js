import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log('position', position),
      err => console.log('error', err)
    )
    return <div>Hi there</div>
  }
}

export default ReactDOM.render(<App />, document.querySelector('#root'))
