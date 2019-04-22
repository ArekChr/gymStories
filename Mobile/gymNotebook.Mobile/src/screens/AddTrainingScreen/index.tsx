import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { FloatingInput } from '../../components';
import { Colors } from '../../styles/colors';
import H4 from '../../components/Headings/H4';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationScreenProp } from 'react-navigation';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Exercise } from '../../utils/exercises/types';
import { editExercises } from '../../redux/createTraining/actions';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<AddTrainingScreen>
}

class AddTrainingScreen extends Component<Props> {

  state = {
    name: '',
    addedExercises: [] as Exercise[]
  }

  renderItem ({ item, index, move, moveEnd, isActive }: any) {
    return (
      <TouchableOpacity
        style={{ 
          margin: 2,
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{ 
          color: isActive ? Colors.secondary : Colors.fontDark,
          fontSize: 20,
        }}>{index + 1}. {item.label}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: Colors.primaryDark, flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <TextInput 
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          style={{ color: Colors.fontDark}} placeholderTextColor={Colors.fontDark}
          placeholder="Name"
        />
        <H4 style={{ margin: 2, padding: 5, marginTop: 20 }} underline>
          Exercises
        </H4>
        <DraggableFlatList
          data={this.props.addedExercises}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.name}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.props.editExercises(data)}
        />
        <TouchableOpacity onPress={() => this.props.navigation.push('AddProgress')}
          style={{ marginLeft: 'auto', paddingRight: 5, paddingLeft: 5, paddingTop: 4 }}>
          <MaterialIcons name="add-circle" size={45} color={Colors.secondary} />
        </TouchableOpacity>

      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  addedExercises: state.CreateTraining.addExercises
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editExercises: (exercises: any) => editExercises(exercises)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTrainingScreen)
