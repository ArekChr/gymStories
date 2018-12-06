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
    return (
      <View style={styles.container}>
          <Text>ActiveTab</Text>
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
  progress: progress.progress
})

const mapDispatchToProps = (dispatch) => ({
  onFetch: (userId) => fetchProgress(userId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTab)