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
  FlatList,
  AsyncStorage

} from 'react-native';

//Import Navigator
import { createStackNavigator } from 'react-navigation';


//Animation and Gradient Library
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';

//Import Another Screen 
import DetailScreen from './components/detail';
import DetailPScreen from './components/detailP';

var {height, width} = Dimensions.get('window');

export class Trending extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseurl: "https://strimai.blob.core.windows.net/media/images/"
    }
    
    
  }
  render(){
    return(
      <TouchableOpacity onPress={() =>
        this.props.navigation.navigate('Detail', {AlbumName: this.props.item.AlbumName, AlbumId: this.props.item.AlbumId })
      }>
          <Image
          style={styles.albumScrollImg}
          source={{uri: this.state.baseurl+'/'+this.props.item.ArtistStageName+'/'+this.props.item.ArtistId+".png"}}
          />
          <View style={styles.albumTextContainer}>
            <View>
              <Text style={styles.albumTextTitle}>{this.props.item.AlbumName}</Text>
              <Text style={styles.albumTextYear}>2016</Text>
            </View>

            <View>
              <Image
              style={styles.albumExpli}
              source={require('./assets/expli.jpg')}
              />
            </View>

          </View>
      </TouchableOpacity>
    )
  }
}

export class NewSongs extends Component{
  constructor(props){
    super(props);
    this.state = {
      baseurl: "https://strimai.blob.core.windows.net/media/images/"
    }
  }

  render(){
    return(
      <View style={styles.smallAlbumContainer}>
                    <Image
                      style={styles.smallAlbum}
                      source={{uri: this.state.baseurl+'/'+this.props.item.ArtistStageName+'/'+this.props.item.ArtistId+".png"}}
                    />
                    <View style={styles.smallAlbumTextContainer}>
                      <View style={styles.smallAlbumRow}>
                          <View style={{zIndex:5}}> 
                          <Text style={styles.albumTextTitle} onPress = {()=>{this.props.navigation.navigate('Main', {TrackURL: this.props.item.TrackUrl, TrackName: this.props.item.MediaName})}}>{this.props.item.MediaName}</Text>
                          <Text style={styles.albumTextYear}>{this.props.item.AlbumName}</Text>
                          </View> 
                          <View style={{zIndex:1}}>
                            <Text style={styles.trackRuntimeStyle}>4.25</Text>
                          </View>        
                      </View>
                    </View>
                  </View>
    )
  }
}

export class Artist extends Component{
  constructor(props){
    super(props)
    this.state = {
      baseurl: "https://strimai.blob.core.windows.net/media/images/"
    }
  }

  render(){
    return(
      <View>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DetailP', {ArtistName: this.props.item.ArtistName, ArtistId: this.props.item.ArtistId})}}>
        <Image
        style={styles.roundedScrollImg}
        source={{uri: this.state.baseurl+'/'+this.props.item.ArtistStageName+'/'+this.props.item.ArtistId+".png"}}
        />
      </TouchableOpacity>
        <View style={styles.albumTextContainerCenter}>
          <View>
            <Text style={styles.albumTextTitle}>{this.props.item.ArtistName}</Text>
          </View>

          <View>
            
          </View>

        </View>
    </View>
    )
  }
 
}
export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };
  constructor(props){
    super(props);
    this.state = {
      site: 'http://strimai.azurewebsites.net/api/playlist/1',
      site2: 'http://strimai.azurewebsites.net/api/playlist/2',
      site3: 'http://strimai.azurewebsites.net/api/artists'
    }
  }
  componentDidMount() {
    this.animation.play();
    this.__GetRequest().done();
    this.__GetSongs().done();
    this.__GetArtists().done();
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  __GetRequest = async () =>{

    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    try{
      return fetch( this.state.site2,{
        method: 'GET',
        headers: {
          'Authorization': Attach,
          'Content-Type': 'application/json'
        }, 
      })
        .then((response) => response.json())
        .then((responseJson) => {

  
          this.setState({
            isLoading: false,
            dataSource: responseJson.data.Albums,
            //art: responseJson.data.Album
            
            
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

  __GetSongs = async () =>{

    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    try{
      return fetch( this.state.site,{
        method: 'GET',
        headers: {
          'Authorization': Attach,
          'Content-Type': 'application/json'
        }, 
      })
        .then((response) => response.json())
        .then((responseJson) => {

  
          this.setState({
            isLoading: false,
            dataSource2: responseJson.data.media,
            
            
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

  __GetArtists = async () =>{

    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    try{
      return fetch( this.state.site3,{
        method: 'GET',
        headers: {
          'Authorization': Attach,
          'Content-Type': 'application/json'
        }, 
      })
        .then((response) => response.json())
        .then((responseJson) => {

  
          this.setState({
            isLoading: false,
            isLoading: false,
            dataSource3: responseJson.data.Artists,
            
            
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




  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(7, 45, 64, 0.5)"
          hidden={true}
          barStyle="light-content"
        />
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom:55}}
        >   
            <View style={styles.animationContainer}>
               <Animation
                  ref={animation => { this.animation = animation; }}
                  loop={true}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  source={require('./assets/animation/logo.json')}
                />
            </View>

            <Image
              style={styles.headerImg}
              source={require('./assets/bobjabinde.jpg')}
            />
            
            <LinearGradient
            locations={[0.1,0.6,1]}
            colors={['rgba(7, 45, 64, 0)', '#072C3E', '#072C3E']}
            style={styles.linearGradient}>
             
            </LinearGradient>

             <View style={styles.albumContainer}>
                  
                  <Text style={styles.homeSideTitle}>T R E N D I N G</Text>
                  <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.albumScrollContainer}>
                      
                  <View style={styles.albumTextContainer}>
                  <FlatList 

                    horizontal = {true}
                    data = {this.state.dataSource}
                    renderItem= {({item, index})=>{
                      return(
                        <Trending navigation = {this.props.navigation} item={item} index={index} parentFlatList = {this} />
                      )
                    }}
                    keyExtractor={({AlbumId}, index) => AlbumId.toString()}
                  />

                  </View>
                         
                  </ScrollView>
                <Text style={styles.homeSideTitle}>L A T E S T  R E L E A S E S</Text>

                <View style = {{height: 275, }}>
                <FlatList 
                    
                    //horizontal = {true}
                    data = {this.state.dataSource2}
                    
                    renderItem= {({item, index})=>{
                      return(
                        <NewSongs navigation = {this.props.navigation} item={item} index={index} parentFlatList = {this}  />
                      )
                    }}
                    keyExtractor={({MediaId}, index) => MediaId.toString()}
                />
              </View>


                <Text style={styles.homeSideTitle}>R E C O M E N D E D</Text>
                 <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.albumScrollContainer}>
                      
                     <View>
                        <FlatList 
                           
                          horizontal = {true}
                          data = {this.state.dataSource3}
                    
                          renderItem= {({item, index})=>{
                      return(
                        <Artist navigation = {this.props.navigation} item={item} index={index} parentFlatList = {this}  />
                      )
                    }}
                    keyExtractor={({ArtistId}, index) => ArtistId.toString()}
                />
                     </View>
                  </ScrollView>

                



              </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072C3E',
  },
  headerImg:{
    height:400,
    width:width,
    zIndex: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  linearGradient: {
     marginTop:-400,
      height:height,
      width: width,
      zIndex: 10,
          flex: 1,

  },


  homeText: {
      fontFamily:'Raleway-Bold',
      fontSize: 18,
      color: '#fff',
      paddingBottom: 30,
      marginLeft: 10,
  },
  homeSideTitle: {
     fontFamily:'Raleway-Bold',
      fontSize: 14,
      color: '#fff',
      paddingTop: 20,
      paddingBottom: 20,
            marginLeft: 10,

  },
  homeBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height:1,
      marginLeft: 10,
      marginRight: 10,
  },
  albumScrollContainer:{
  },
  albumContainer: {
    marginTop: -400,
    zIndex:90,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',

  },
  albumScrollImg: {
    height: 156,
    width:156,
    marginLeft: 10,
    borderRadius: 7,
  },
  roundedScrollImg: {
    height: 156,
    width:156,
    marginLeft: 10,
    borderRadius: 78,
  },
   albumTextContainerCenter: {
    flexDirection:'row',
    justifyContent: 'center',
    alignContent:'center',
        marginLeft: 11,
        marginTop: 10,

  },
  albumTextContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignContent:'center',
        marginLeft: 11,
        marginTop: 10,

  },

  albumExpli: {
    height: 17.5,
    width:17.5,
    marginRight: 2,

  },
  albumTextTitle: {
    fontFamily:'Raleway-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  },
  albumTextYear: {
    fontFamily:'Raleway-Light',
    fontSize: 13,
    fontWeight: '100',
    color: '#fff'
  },

  smallAlbum: {
    width:80,
    height:80,
    borderRadius:7,
  },

  smallAlbumTextContainer: {
    marginLeft:15,
    alignSelf:'center',
    flex:5,
  },
  smallAlbumContainer: {
        marginLeft:10,
        flexDirection:'row',
        justifyContent: 'flex-start',
        marginBottom: 14,
  },

  animationContainer: {
      zIndex:90,
      alignSelf:'center',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      marginTop:0,
      position:'absolute'

  },


   trackRuntimeStyle: {
    fontFamily:'Raleway-Regular',
      fontSize: 15,
      color: '#fff',
  },

  smallAlbumRow:{
    
    flexDirection:'row',
    justifyContent: 'space-between',
    marginRight: 15,
  
  }
});


