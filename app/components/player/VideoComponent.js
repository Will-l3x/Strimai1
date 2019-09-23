import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'
//import Icon from 'react-native-vector-icons'

export default class VideoComponent extends React.Component {

  renderVideo () {
      return(
        <Video
            source={{uri: this.props.track}} // Can be a URL or a local file.
            ref="audioElement"
            paused={this.props.lop}               // Pauses playback entirely.
            resizeMode="cover"           // Fill the whole screen at aspect ratio.
            repeat={true}                // Repeat forever.
            muted = {false}
            playInBackground = {true}
            ignoreSilentSwitch = {'ignore'}
            onLoadStart={this.loadStart} // Callback when video starts to load
            //onLoad={this.setDuration.bind(this)}    // Callback when video loads
            //onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
            onEnd={this.onEnd}           // Callback when playback finishes
            onError={this.videoError}    // Callback when video cannot be loaded
            style={styles.audioElement} 
        />
      )
  }

  render () {
    return (
      <View style = {{flex: 1, backgroundColor: 'black'}}>
        <View style = {{flex: 2, backgroundColor: 'black'}}>

        </View>
        {this.renderVideo()}
      </View>
    )
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
