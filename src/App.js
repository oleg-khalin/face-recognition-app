import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: '474e781becf0487496c202408e9d441a'
});

const particlesOptions = {
  particles: {
    number: {
      value: 123,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY:1200
      }
    }
  },
  retina_detect: true
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: clarifaiFaces.left_col * 100 + '%',
      topRow: clarifaiFaces.top_row * 100 + '%',
      rightCol: 100 - clarifaiFaces.right_col * 100 + '%',
      bottomRow: 100 - clarifaiFaces.bottom_row * 100 + '%'
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(response => {
        console.log(response);
        return this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if(route === 'signOut')
      this.setState({ isSignedIn: false });
    else if(route === 'home')
      this.setState({ isSignedIn: true });
    
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={ particlesOptions }
        />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={ this.onInputChange }
                onButtonSubmit={ this.onButtonSubmit }
              />
              <FaceRecognition box={ box } imageUrl={ imageUrl } />
            </div>
          : (
              route === 'register'
              ? <Register onRouteChange={ this.onRouteChange } />
              : <SignIn onRouteChange={ this.onRouteChange } />
            )
        }
      </div>
    );
  }
}

export default App;
