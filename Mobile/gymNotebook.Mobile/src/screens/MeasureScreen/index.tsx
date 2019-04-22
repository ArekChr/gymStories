import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../../redux';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Dispatch } from 'redux';
import MuscleModelComponent from '../../components/MuscleModel';
import { Colors } from '../../styles/colors';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<MeasureScreen>
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
    // this.props.fetchMeasurement(userId)
  }

  render() {
    return (
      <View style={{ backgroundColor: Colors.primaryDark, flex: 1}}>
        <ScrollView>
          <MuscleModelComponent navigation={this.props.navigation} />
        </ScrollView>
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
