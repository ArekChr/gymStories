import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import exe from '../../utils/exercises'
import Input from '../../components/Input/Index';
import { Exercise } from '../../utils/exercises/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../styles/colors';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {

}

class GymScreen extends Component<Props> {

  state = {
    exerciseFilter: '',
    exercises: [] as Exercise[]
  }

  componentDidMount() {
    this.setState({ exercises: exe })
  }

  onSearchChange = (text: string) => {
    text = text.toLowerCase()
    this.setState({ exercises: exe.filter(x => x.label.toLowerCase().includes(text) || x.musclePart[0].name.toLowerCase().includes(text) )})
  }

  render() {
    const { exercises } = this.state
    return (
      <View style={{ display: 'flex', flex: 1, backgroundColor: Colors.primaryDark }}>
        <Input placeholder='Znajdź ćwiczenie...' onChangeText={(text) => this.onSearchChange(text)} />
        <ScrollView>
          {
            exercises.map((x, i) => {
              return (
                <View key={i} style={{ margin: 2, marginLeft: 10 }}>
                  <Text style={{ fontSize: 16, color: Colors.fontLight }}>{x.label}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GymScreen)
