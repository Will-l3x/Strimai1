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
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import axios from 'axios'
//Animation and Gradient Library
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';

var {height, width} = Dimensions.get('window');
export default class SignUpScreen extends Component {
    static navigationOptions = {
    title: 'Welcome',
    header: null
  };

   constructor(props) {
        super(props);
        this.state = {email: '', firstname: '',
        lastname: '',
        dob: '',
        password: '',
        vpassword: '',};
    }

   componentDidMount() {
    this.animation.play();
    //this._loadInitialState().done();
    //this.__clear().done();
  }
  

  __clear = async () => {
    AsyncStorage.clear()
}
  __LogIN = () => {
    axios.post('http://strimai.azurewebsites.net/api/register',{email: this.state.email,firstname: this.state.firstname,lastname: this.state.lastname, dob: this.state.dob, password: this.state.password, vpassword: this.state.vpassword

        }).then(response =>{
            console.log(response);
            if(response.success === true){
                alert(response.message)
                this.props.navigation.navigate('Home')
            }else{
                alert(response.message)
            }
        })
}   

  _loadInitialState = async ()=> {
    try{
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
            this.props.navigation.navigate('Home')
  
        }
    }catch(e){

    }
  }
 

  render() {
    return (
              <View style={styles.container}>
                 <View style={styles.animationContainer}>
                    <Animation
                        ref={animation => { this.animation = animation; }}
                        loop={true}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={require('../assets/animation/logo.json')}
                        />
                </View>

                <View style={styles.theScroll}>
                    <Text style={styles.loginText}>EMAIL</Text>
                    <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoCorrect={false}
                    style={styles.loginInput}
                    onChangeText={(email) => {
                        this.setState({email});
                    }}>
                    </TextInput>
                    <Text style={styles.loginText}>First Name</Text>
                     <TextInput
                     underlineColorAndroid='rgba(0,0,0,0)'
                     autoCorrect={false}
                    
                    style={styles.loginInput}
                    onChangeText={(firstname) => {
                        this.setState({firstname});
                    }}>
                    </TextInput>

                    <Text style={styles.loginText}>Last Name</Text>
                    <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoCorrect={false}
                    style={styles.loginInput}
                    onChangeText={(lastname) => {
                        this.setState({lastname});
                    }}>
                    
                    </TextInput>

                    <Text style={styles.loginText}>DOB</Text>
                     <TextInput
                     underlineColorAndroid='rgba(0,0,0,0)'
                     autoCorrect={false}
                     
                     placeholder = " 1 January 1998"
                    style={styles.loginInput}
                    onChangeText={(dob) => {
                        this.setState({dob});
                    }}>
                    </TextInput>

                    <Text style={styles.loginText}>PASSWORD</Text>
                     <TextInput
                     underlineColorAndroid='rgba(0,0,0,0)'
                     autoCorrect={false}
                     secureTextEntry={true}
                    style={styles.loginInput}
                    onChangeText={(password) => {
                        this.setState({password});
                    }}>
                    </TextInput>

                    <Text style={styles.loginText}>VERIFY PASSWORD</Text>
                    <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.loginInput}
                    onChangeText={(vpassword) => {
                        this.setState({vpassword});
                    }}>
                    </TextInput>
                    
                    
                    <TouchableOpacity onPress = {this.__LogIN}>
                        <View style={styles.loginButton} >
                          <Text style={styles.loginButtonText} >SIGN UP</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Login')}}>
                        <View style={styles.loginButton} >
                          <Text style={styles.loginButtonText} >BACK</Text>
                        </View>

                    </TouchableOpacity>
                
                   
                </View>

              </View>
    )
   }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,                
    backgroundColor: '#222222',
  },
  animationContainer: {
      alignSelf: 'center',
      paddingTop:25,
  },

  loginText: {
    fontSize: 10,
    marginTop: 10,
    color: '#fff',

  },
  loginButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#212121',

  },

 loginButton: {
  padding:10,
  marginTop:30,
  marginBottom:10,
  backgroundColor: '#fff',
  borderRadius: 3.3,

  },
  loginInput: {
    padding:5,
    marginTop: 10,
        color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    	borderRadius: 3.3,

    height: 40,
  },

  theScroll: {
    padding: 30,
  },
});
