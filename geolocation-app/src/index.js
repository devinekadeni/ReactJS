import React from 'react'
import ReactDOM from 'react-dom'

import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
  // constructor(props) {
  //   super(props)  // for calling props from its (React.Component constructor) parent

  //   this.state = {
  //     lat: null,
  //     errorMessage: '',
  //   }
  // }

  /* equivalent as the constructor above */
  state = {
    lat: null,
    errorMessage: '',
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    )
  }

  renderContent() {
    if (this.state.errorMessage) {
      return <div>Erro: {this.state.errorMessage}</div>
    } else if (this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    } else {
      return <Spinner message="Please accept location request" />
    }
  }
  
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default ReactDOM.render(<App />, document.querySelector('#root'))
