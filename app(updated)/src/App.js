import React ,{Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm.js';
import Rank from './component/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './component/FaceRecognition/FaceRecognition.js';
import SignIn from './component/SignIn/SignIn.js';
import SignUp from './component/SignUp/SignUp.js';

const app = new Clarifai.App({
 apiKey: '2267ec4c405c42a499e5060f7ca44a87'
});

const particlesOptions = {
                particles: {
                  number: {
                    value : 90,
                    density: {
                      enable:true,
                      value_area:800
                    }
                  }
                }
              }



class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'SignIn',
      isSignedIn : false,
    }
  }

  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : faceBox.left_col*width,
      topRow : faceBox.top_row*height,
      rightCol : width - (faceBox.right_col*width),
      bottomRow : height - (faceBox.bottom_row*height),
    }
  }

  onRouteChange = (route) => {
    if(route==='SignOut') {
      this.setState({isSignedIn: false})
    } else if (route == 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route : route});
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  displayName = (data) => {
    const faceName = data.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL,
      this.state.input)
    .then(response =>
      this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  render(){
   return (
     <div className="App">
        <Particles className='particles'
              params={particlesOptions}
            />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route ==='home' 
      ? <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div> 
      :(
        this.state.route === 'SignIn'
            ? <SignIn onRouteChange={this.onRouteChange}/> 
            : <SignUp onRouteChange={this.onRouteChange}/> 
        ) 
      }
     </div>
  );
}
}

export default App;

//name -- response.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
//box -- response.outputs[0].data.regions[0].region_info.bounding_box;