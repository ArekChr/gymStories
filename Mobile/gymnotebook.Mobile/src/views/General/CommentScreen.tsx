import * as React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation: NavigationScreenProp<CommentScreen>
}

class CommentScreen extends React.Component<Props> {

  componentDidMount(){
    const { navigation } = this.props;
    const postId = navigation.getParam('postId');
    console.log(postId)
    //this.props.fetchComments(postId, 20)
  }

  render() {
    return (
      <View style={{ display: 'flex', 
      flexDirection: 'row', alignItems: 'center', 
      justifyContent: 'space-between', 
      position: 'absolute', bottom: 0, margin: 10, marginBottom: 15, borderTopColor: 'black'}}>
        <Image style={{ width: 30, height: 30, borderRadius: 45, marginTop: 'auto', display: 'flex'}} 
        source={require('../../images/profile3.jpg')}/>
        <TextInput multiline={true} 
          placeholder="Dodaj komentarz..." 
          placeholderTextColor="gray" 
          style={{display: 'flex', flex: 1, margin:0, padding: 0, color: 'black', marginLeft: 8}} />
        <TouchableOpacity style={{marginTop: 'auto', marginBottom: 5}}>
          <Text style={{ marginLeft: 5, color: '#1565C0' }}>Opublikuj</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
