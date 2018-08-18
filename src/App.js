import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models
      .predict(
      Clarifai.COLOR_MODEL,
          // URL
          "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(function(response) {
          console.log(response);
        },
        function(err) {
        // there was an error
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={ particlesOptions }
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={ this.onInputChange }
          onButtonSubmit={ this.onButtonSubmit }
        />
        {/*        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
