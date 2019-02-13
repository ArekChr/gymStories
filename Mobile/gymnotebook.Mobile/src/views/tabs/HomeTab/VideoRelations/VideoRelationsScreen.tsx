import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, StatusBar, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<VideoRelationsScreen>
}

class VideoRelationsScreen extends Component<Props> {

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: false,
  };

  video: Video;

  onLoad = (data) => {
    this.setState({ duration: data.duration, paused: false });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
    this.props.navigation.popToTop()
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <TouchableWithoutFeedback
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
        <View style={styles.fullScreen}>
          <View style={{ margin: 2, marginTop: 5, display: 'flex', flexDirection: 'row' }}>
            
            <View style={{ flex: 1, flexDirection: 'row', borderRadius: 3, overflow: 'hidden', borderRadius: 2, margin: 1.5}}>
              <View style={[{height: 2.5, backgroundColor: '#cccccc', borderBottomLeftRadius: 2, borderTopLeftRadius: 2 }, { flex: flexCompleted }]} />
              <View style={[{height: 2.5, backgroundColor: '#505050', borderTopRightRadius: 2, borderBottomRightRadius: 2 }, { flex: flexRemaining }]} />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', margin: 10, marginBottom: 6, alignItems: 'center'}}>
            <View>
              <Image style={{ width: 35, height: 35, borderRadius: 45, marginRight: 10}} source={require('../../../../images/profile4.jpg')}/>
            </View>
            <Text style={{fontSize: 13, color: 'white'}}>testoviron<Text style={{color: 'rgba(255,255,255,0.6)'}}> 2 godz.</Text></Text>
          </View>
          <Video
            ref={(ref: Video) => { this.video = ref }}
            /* For ExoPlayer */
            source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }}
            // source={require('./videoplayback.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
          <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
            <TouchableOpacity style={{ marginLeft: 5, marginRight: 2, display: 'flex', borderRadius: 45, borderColor: 'rgba(255,255,255,0.6)', borderWidth: 1, height: 45, width: 45, alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="camera" size={21} color="white"/>
            </TouchableOpacity>
            <TextInput placeholder="Wyślij wiadomość" placeholderTextColor='rgba(255,255,255,0.6)' 
              style={{ flex: 1, borderRadius: 45, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', height: 45, paddingLeft: 15, paddingRight: 15, margin: 7, color: 'white'}}/>
            {/* <TouchableOpacity style={{ backgroundColor: 'yellow'}}>
              <Text style={{color: 'rgba(255,255,255,0.5)', fontWeight: '600', position: 'absolute', bottom: 20, right: 20}}>Wyślij</Text>
            </TouchableOpacity> */}
            <TouchableOpacity>
              <Ionicons name="ios-send" size={30} color="white" style={{marginLeft: 5, marginRight: 10}}/>
            </TouchableOpacity>
          </View>
        </View>

        </TouchableWithoutFeedback>

        {/* <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 2.5,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 2.5,
    backgroundColor: '#505050',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

export default VideoRelationsScreen;
