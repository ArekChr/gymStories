import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../../redux';
import { NavigationScreenProps } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
}

export class MeasureScreen extends Component<Props> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{paddingRight: 10}} onPress={navigation.getParam('onProgressAddOpen')}>
            <MaterialIcons name="add" size={30} color='white' /> 
          </TouchableOpacity>
        </View>
      )
    }
  }


  componentDidMount() {
    const { userId } = this.props
    this.props.fetchMeasurement(userId)
  }

  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  userId: state.Auth.auth.uid
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MeasureScreen)
