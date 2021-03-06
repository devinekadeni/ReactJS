import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';
import 'tachyons';



const particlesOptions = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = box => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    const { input } = this.state;
    this.setState({ imageUrl: input });
    
    fetch('https://fierce-coast-49838.herokuapp.com/imageUrl/', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              input: this.state.input,
            })
          })
      .then(resp => resp.json())
      .then(response => {
        if(response) {
          fetch('https://fierce-coast-49838.herokuapp.com/image/', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(res => res.json())
          .then(entries => this.setState(Object.assign(this.state.user, { entries })))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({ route, isSignedIn: true, imageUrl: '' });      
    } else {
      this.setState({ route, isSignedIn: false });            
    }
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home' ?  
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
            <FaceRecognition box={this.state.box} image={this.state.imageUrl} />
          </div> :
          this.state.route === 'signIn' ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />           
        }
        
        
      </div>
    );
  }
}

export default App;
