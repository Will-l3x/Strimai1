import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  Animated,
  UIManager,
  FlatList,
  AsyncStorage
} from 'react-native';

//Import Navigator
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Video from 'react-native-video'


//Import Another Screen 
import DetailScreen from './components/detail';
import DetailPScreen from './components/detailP';
import LoginScreen from './components/login';
import Home from './home';
import Controls from './components/player/Controls';
import SeekBar from './components/player/SeekBar';
import SignUpScreen from './components/SignUp';

const {height, width} = Dimensions.get('window');
const albumSize = width*0.75;
const albumRounded = albumSize/2;


export class Main extends Component {
   constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      drawerState: false,
      drawerAnim: new Animated.Value(0),   
      drawerOpacity: new Animated.Value(0),        // Initial value for opacity: 0
      paused: true,
      totalLength: 1,
      message: '',
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      artist: '',
      shuffleOn: false,
      site: 'https://strimai.blob.core.windows.net/media/',
      AlbumSite: 'http://strimai.azurewebsites.net/api/album/',
      Artwork: '',
      play: [
        {
          AlbumMediaId: '1003',
          MediaId: '1006',
          MediaName: "Intro",
          TrackNo: '1',
          Plays: 0,
          TrackUrl: 'audio%2Fartists%2F2BG%2FNdoda%20kuva%20newe%2F01%20-%20Intro.mp3',
        },
        {
          AlbumMediaId: '1004',
          MediaId: '1007',
          MediaName: "Vimb Neni",
          TrackNo: '2',
          Plays: 0,
          TrackUrl: "audio%2Fartists%2F2BG%2FNdoda%20kuva%20newe%2F03%20-%20For%20ever%20baby.mp3"
        },
        {
          AlbumId: '1005',
          MediaId: '1008',
          MediaName: 'baby',
          TrackNo: '3',
          Plays: 0,
          TrackUrl: 'audio%2Fartists%2F2BG%2FNdoda%20kuva%20newe%2F02%20-%20Vimba%20neni.mp3',
        },

      ]
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  static navigationOptions = {
    title: 'Home',
    header: null
  };
  

  componentDidMount() {
    const Album = this.props.navigation.getParam('Gets', null);
        const Select = this.props.navigation.getParam('SelectedTrack', 1);
        const hh = this.props.navigation.getParam('Artis', 'Strimai')
        this.setState({
            AlbumSite: this.state.AlbumSite + Album,
            paused: false,
            selectedTrack: Select
        })
        this.__GetAlbum().done();
        
  }

  __GetAlbum = async () => {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    try{
      return fetch( this.state.AlbumSite,{
        method: 'GET',
        headers: {
          'Authorization': Attach,
          'Content-Type': 'application/json'
        }, 
      })
        .then((response) => response.json())
        .then((responseJson) => {

  
          this.setState({
           
            //dataSource: responseJson.data.Albums,
           play: responseJson.data.Media,
           //play: dataSource,
            isLoading: false
            
            
          })

        })
        .catch((error) =>{
          alert("Error perfoming your request")
          console.error(error);
        });

    }catch(e){
      console.log(e instanceof TypeError)
      console.error(e.message);
    }finally{
      
    }
  }

  login(){
    console.log("logging in... ");
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
        loggedIn: true,
        loading: false
    });
   }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.state.play.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }
  onEnd(){
    this.onForward().done();
  }

  videoError(){
    alert('Playback error');
    this.onBack().done();
  }
  doAnimation(){
    if(this.state.drawerState === false){
         Animated.timing(                            
              this.state.drawerAnim,                      
              {
                duration: 600,
                toValue: height,
              }
          ).start()
          
        this.setState({drawerState: true});
 
    } else {
         Animated.timing(                            
              this.state.drawerAnim,                      
              {
                duration: 600,
                toValue: 0,
              }
          ).start()
       
        this.setState({drawerState: false});
    
    }
  }
  render() {
    const songs = this.state.play[this.state.selectedTrack]
      const song = this.props.navigation.getParam('TrackURL', null)
      const name = this.props.navigation.getParam('TrackName', null)
    const video = this.state.isChanging ? null : (
      <Video source={{uri: this.state.site+songs.TrackUrl}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={this.state.repeatOn}                // Repeat forever.
        muted = {false}
        playInBackground = {true}
        playWhenInactive = {true}
        ignoreSilentSwitch = {'ignore'}
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onForward.bind(this)}           // Callback when playback finishes
        onError={this.onBack.bind(this)}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );
     if(this.state.loggedIn === true){
        return (
          <View style={styles.container}>
            

            <Animated.View                           
            style={{
              zIndex:901,
              marginBottom:0,
              bottom: 0,
              backgroundColor:'#222222',
                    justifyContent: 'flex-start',

              height: this.state.drawerAnim,          
            }}>
              <View style={styles.popupContainer1}>
                <TouchableOpacity onPress={this.doAnimation.bind(this)}>
                  <View style={{padding: 15}}>
                        <Image
                        style={styles.upArrow}
                        source={require('./assets/down-arrow.png')}
                        />
                   </View>
                </TouchableOpacity>
              </View>

              <View style={styles.popupContainer2}>
                    <Image
                      style={{height:albumSize,width:albumSize,alignSelf:'center',borderRadius:10}}
                      source={require('./assets/default.png')}
                    />
                   <Text style={styles.popupTextTitle}>{name}</Text>
                  <Text style={styles.popupTextYear}>{this.state.artist}</Text>

                  <SeekBar 
                  onSeek={this.seek.bind(this)}
                  trackLength={this.state.totalLength}
                  onSlidingStart={() => this.setState({paused: true})}
                  currentPosition={this.state.currentPosition} />

                  <Controls 
                  onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
                  repeatOn={this.state.repeatOn}
                  shuffleOn={this.state.shuffleOn}
                  forwardDisabled={this.state.selectedTrack === songs.length - 1}
                  onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
                  onPressPlay={() => this.setState({paused: false})}
                  onPressPause={() => this.setState({paused: true})}
                  onBack={this.onBack.bind(this)}
                  onForward={this.onForward.bind(this)}
                  paused={this.state.paused} />
                  {video}


              </View>

              <View style={styles.popupContainer3}>

              </View>

                
            </Animated.View>


            <View style={styles.absoluteBottom}>
              <TouchableOpacity onPress={this.doAnimation.bind(this)}>
              <View style={{marginLeft: 15 }}>
                   <Image
                      style={styles.upArrow}
                      source={require('./assets/up-arrow.png')}
                    />
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.doAnimation.bind(this)}>
              <View style={{alignItems: 'center' }}>
                 <Text style={styles.playerTextTitle}>Thunder</Text>
                 <Text style={styles.playerTextYear}>Imagine Dragons</Text>

              </View>
              </TouchableOpacity>

              <View style={{marginRight: 15 }}>
                 <Image
                      style={styles.playArrow}
                      source={require('./assets/play-arrow.png')}
                    />
              </View>
                     
            </View>
          </View>
                
                 

                
        );
      } else {
            return (
            <LoginScreen login={this.login.bind(this)}>
            </LoginScreen>
            
            );
     }
  }
}

const styles = StyleSheet.create({
  absoluteBottom: {
      zIndex:900,
      position: 'absolute',
      width:width,
      height:55,
      bottom: 0,
      backgroundColor:'#222222',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center' 

  },

  playerTextTitle: {
    fontFamily:'Raleway-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  },
  playerTextYear: {
    fontFamily:'Raleway-Regular',
    fontSize: 13,
    fontWeight: '100',
    color: '#fff'
  },

   popupTextTitle: {
    fontFamily:'Raleway-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop:16,
  },
  popupTextYear: {
    fontFamily:'Raleway-Regular',
    fontSize: 13,
    color: '#fff',
    alignSelf: 'center'

  },

  upArrow: {
    width:20,
    height:20,
  },

  playArrow: {
     width:27,
    height:27,
  },
  popupContainer1: {
    zIndex:1,
  },
  popupContainer2: {
    zIndex:5,
    marginTop:30
  },
  popupContainer3: {
    zIndex:3,
  },
   container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


const bccMusic = createStackNavigator({
  
  
  
  
  Login: LoginScreen,
  Sign: SignUpScreen,
  Home: Home,
  Main: Main,
 
  
  Detail: DetailScreen,
  DetailP: DetailPScreen
})
 export default createAppContainer(bccMusic);
//AppRegistry.registerComponent('bccMusic', () => bccMusic);