import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { fetchProgress } from '../../store/progress/actions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { HEADER_COLOR, STATUS_BAR_COLOR } from '../../styles/common'

class ActiveTab extends Component {

  static navigationOptions = {
    title: 'Progress',
    headerRight: (
      <TouchableOpacity style={{paddingRight: 10}} onPress={() => console.log(this)}>
        <MaterialIcons name="add" size={30} color='white' /> 
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: HEADER_COLOR,
    },
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.onProgressAdd})
    this.props.onFetch("0B704143-3739-4C6D-B0C4-280795FE271A");
  }

  onProgressAdd = () => {
    console.log('tuta')
    this.props.navigation.navigate('AddProgressScreen')
  }
  
  render() {
    if(this.props.progressLoading) {
      return (
      <View>
        <Text>Loading ...</Text>
      </View>
      )
    }

    const listProgress = this.props.progress.map(progress => 
      <View key={progress.id}>
        <Text>Id: {progress.id}</Text>
        <Text>Created At: {progress.createdAt}</Text>
        <Text>Biceps: {progress.biceps}</Text>
        <Text>Weight: {progress.weight}</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        {listProgress}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    backgroundColor: HEADER_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    alignSelf: 'center',
    paddingLeft: 20,
    color: 'white',
    fontSize: 20
  }
})

const mapStateToProps = ({progress}) => ({
  progress: progress.progress,
  progressLoading: progress.progressLoading
})

const mapDispatchToProps = (dispatch) => ({
  onFetch: (userId) => fetchProgress(userId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTab)