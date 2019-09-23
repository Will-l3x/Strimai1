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
  TouchableWithoutFeedback,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  
} from 'react-native';


//Animation and Gradient Library
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window');

export class AlbumSongs extends Component {
  constructor(props){
    super(props);
    
  }

  render(){
    return(
      
      <View style={styles.trackListContainer}>
      <View style={styles.trackListNumber}>
        <Text style={styles.trackNumberStyle}>{this.props.item.TrackNo}</Text>
      </View>

      <View style={styles.tracklistTitle}>
      <Text style={styles.trackTitleStyle} onPress = {()=>{this.props.navigation.navigate('Main', {TrackURL: this.props.item.TrackUrl, TrackName: this.props.item.MediaName, Gets: this.props.item.AlbumId, SelectedTrack: this.props.item.TrackNo})}}>{this.props.item.MediaName}</Text>
      <Text style={styles.trackSubStyle}>{this.props.item.ArtistStageName}</Text>

      </View>

      <View style={styles.tracklistRuntime}>
        <Text style={styles.trackRuntimeStyle}></Text>
      </View>
  </View>
  
          
    )
  }
}
export default class DetailScreen extends Component {

  static navigationOptions = {
    title: 'Welcome',
    header: null
  };
  constructor(props){
    super(props);
    this.state = {
        isLoading: true,
        imageurl: '../shumba.jpg',
        site: 'http://strimai.azurewebsites.net/api/album/',
        albumname: '',
        artist: '',
        dataSc: 'hjjk',
    }
}

  componentDidMount() {
    const AlbumKey = this.props.navigation.getParam('AlbumId', null);
        const AlbumName = this.props.navigation.getParam('AlbumName', null)
        const ArtistName = this.props.navigation.getParam('ArtistName', 'Strimai')
        this.setState({
          albumname: ArtistName,
          site2: this.state.site+AlbumKey,
          artist: ArtistName
        })
        this.__GetRequest().done();
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
           
            //dataSource: responseJson.data.Albums,
           dataSource: responseJson.data.Media,
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

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
       
         <StatusBar
          backgroundColor="rgba(7, 45, 64, 0.5)"
          hidden={true}
          barStyle="light-content"
        />
        <ScrollView
        showsVerticalScrollIndicator={false}
        >  

            <Image
                style={styles.headerImg}
                source={require('../assets/cleanest-blur.png')}
            />

            <LinearGradient
            locations={[0.1,0.45,1]}
            colors={['rgba(7, 45, 64, 0)', '#203053', '#203053']}
            style={styles.linearGradient}>
              <View style={styles.topMenuContainer}>
                <TouchableWithoutFeedback 
                  onPress={() => goBack()}>
                  <View>
                    <Image
                    style={styles.backbutton}
                    source={require('../assets/return.png')}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              



              <View style={styles.detailTitleContainer}>
                <View>
                  <Text style={styles.detailTitle} >{this.state.AlbumName}</Text>
                  <Text style={styles.detailSubTitle}>{this.state.albumname}</Text>
                </View>
                <View style={styles.detailPlayButtonContainer}>
                      <View style={styles.detailPlayButton}>
                        <TouchableOpacity onPress = {()=>{
                          this.props.navigation
                        }}>
                          <Image
                              style={styles.detailPlayButtonIcon}
                              source={require('../assets/video.png')}
                          />
                        </TouchableOpacity>
                      </View>

                </View>
              </View>

            </LinearGradient>
            <View style={styles.detailContainer}>
                
            <FlatList
                data={this.state.dataSource}
                renderItem= {({item, index})=>{
                  return(
                    <AlbumSongs navigation = {this.props.navigation} item={item} index={index} parentFlatList = {this}  />
                  )
                }}
                keyExtractor={({MediaId}, index) => MediaId.toString()}
              />
                   

                
            </View>

            
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203053',
    zIndex:1,
  },
  headerImg:{
    height:400,
    width:width,
    zIndex: 0,
  },
   linearGradient: {
     marginTop:-400,
      height:height,
      width: width,
      zIndex: 10,
      flex: 1,

  },
  detailContainer: {
    marginTop: -320,
    zIndex:90,
    backgroundColor: '#203053',

  },
  detailTitleContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    
  },
  detailTitle: {
     fontFamily:'Raleway-ExtraBold',
      fontSize: 20,
      color: '#fff',
      paddingTop: 150,
      paddingBottom: 5,
      marginLeft: 10,
      zIndex:99,
      backgroundColor: 'rgba(255, 255, 255, 0.0)',


  },
  detailSubTitle: {
     fontFamily:'Raleway-Regular',
      fontSize: 13,
      color: '#fff',
      marginLeft: 10,
      paddingBottom: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.0)',


  },
  detailPlayButton: {
    height:55,
    width:55,
    borderRadius:27.5,
    backgroundColor:'#D90850',
  },
  detailPlayButtonContainer: {
    paddingTop: 150,
    paddingBottom: 5,
    marginRight: 10,
  },
  detailPlayButtonIcon: {
    height:22,
    width:22,
    marginTop:16,
    marginLeft:18,
  },
  topMenuContainer: {
          paddingTop:20,
          zIndex:99,
    flexDirection:'row',
    justifyContent: 'space-between',
  },

  //TrackList
  trackListContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginRight: 15,
    marginLeft: 15,
  },

  trackListNumber: {
    flexShrink:1
  },
  tracklistTitle: {
    marginLeft:35,
    flex:5
  },
  tracklistRuntime: {
    flexShrink:3
  },
  trackNumberStyle: {
    fontFamily:'Raleway-Medium',
      fontSize: 18,
      color: '#fff',
  },
  trackSubStyle: {
      fontFamily:'Raleway-Regular',
      fontSize: 13,
      color: '#fff',
  },
    trackTitleStyle: {
    fontFamily:'Raleway-Medium',
      fontSize: 16,
      color: '#fff',
  },
  trackRuntimeStyle: {
    fontFamily:'Raleway-Bold',
      fontSize: 15,
      color: '#fff',
  },
  trackBreakLine: {
    marginTop:15,
    marginBottom:20,
    height:0,
    backgroundColor:'rgba(255, 255, 255, 0.76)',
     marginRight: 15,
    marginLeft: 15,
  },
  backbutton: {
     height:32,
    width:32,
        marginLeft: 15,

  }
});