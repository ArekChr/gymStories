import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchProgress } from '../../store/progress/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ActiveTab extends Component {

  componentDidMount(){
    this.props.onFetch("0B704143-3739-4C6D-B0C4-280795FE271A");
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="heart-pulse" size={30} color={tintColor} />
    )
  }
  
  render() {
    if(this.props.progressLoading) {
      return (
      <View>
        <Text>Loading ...</Text>
      </View>
      )
    }
    console.log(this.props.progress)
    const listProgress = this.props.progress.map(progress => 
      <View key={progress.id}>
        <Text>
          Id: {progress.id}
        </Text>
        <Text>
          Created At: {progress.createdAt}
        </Text>
        <Text>
          Biceps: {progress.biceps}
        </Text>
        <Text>
          Weight: {progress.weight}
        </Text>
      </View>
    )
    return (
      <View style={styles.container}>
          {listProgress}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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