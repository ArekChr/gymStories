import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux'
import exe from '../../utils/exercises'
import Input from '../../components/Input/Index'
import { Exercise } from '../../utils/exercises/types'
import { Colors } from '../../styles/colors'
import H3 from '../../components/Headings/H3'
import { addExercises } from '../../redux/createTraining/actions'
import { NavigationScreenProp } from 'react-navigation'

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<AddProgress>
}

class AddProgress extends Component<Props> {
  state = {
    exerciseFilter: '',
    exercises: [] as Exercise[],
    multiple: false,
    selectedExercises: [] as Exercise[],
  }

  componentDidMount() {
    this.setState({ exercises: exe })
  }

  onSearchChange = (text: string) => {
    text = text.toLowerCase()
    this.setState({
      exercises: exe.filter(
        x => x.label.toLowerCase().includes(text) || x.muscleSupport[0].name.toLowerCase().includes(text)
      ),
    })
  }

  onLongPress(selected: Exercise) {
    const { selectedExercises, multiple } = this.state
    let exercise = selectedExercises.find(x => x.name === selected.name)
    if (exercise) {
      this.setState({
        multiple: !multiple,
        selectedExercises: selectedExercises.filter(x => x.name !== selected.name),
      })
    }
    this.setState({
      multiple: !multiple,
      selectedExercises: [...selectedExercises, selected],
    })
  }

  onAddExercise = (exercise: Exercise) => {
    const { selectedExercises, multiple } = this.state
    if (multiple) {
      let exists = selectedExercises.find(x => x.name === exercise.name)
      if (exists) {
        this.setState({ selectedExercises: selectedExercises.filter(x => x.name !== exercise.name) })
      } else {
        this.setState({ selectedExercises: [...selectedExercises, exercise] })
      }
    } else {
    }
  }

  onAddExercises = () => {
    this.props.addExercises(this.state.selectedExercises)
    this.props.navigation.pop()
  }

  render() {
    const { exercises } = this.state
    return (
      <View style={{ display: 'flex', flex: 1, backgroundColor: Colors.primaryDark }}>
        <Input placeholder='Znajdź ćwiczenie...' onChangeText={text => this.onSearchChange(text)} />
        {this.state.multiple && <H3>Add multiple</H3>}
        <ScrollView>
          {exercises.map((x, i) => {
            let selected = this.state.selectedExercises.some(e => e.name === x.name)
            return (
              <TouchableOpacity
                onLongPress={() => this.onLongPress(x)}
                onPress={() => this.onAddExercise(x)}
                key={i}
                style={{ margin: 2, marginLeft: 10 }}
              >
                <Text style={{ fontSize: 16, color: selected ? Colors.secondary : Colors.fontLight }}>{x.label}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <TouchableOpacity onPress={() => this.onAddExercises()}>
          <H3 style={{ height: 50, backgroundColor: Colors.primaryLight, display: 'flex', alignSelf: 'center' }}>
            Dodaj Ćwiczenia
          </H3>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addExercises: (exercises: Exercise[]) => addExercises(exercises)(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProgress)
