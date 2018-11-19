import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Progress } from '../../store/progress/types'
import { fetchProgress } from '../../store/progress/actions'
import { ApplicationState } from '../../store'

interface IAppPropsFields {
  progress: Progress[]
}


export interface IAppProps extends IAppPropsFields {
}

class ActiveTab extends Component<IAppProps> {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
      <MaterialCommunityIcons name="heart-pulse" size={30} color={tintColor} />
    )
  }

  public render() {
    return (
            <View style={styles.container}>
                <Text>ActiveTab</Text>
                <Text>{this.props.progress![0].CreatedAt}</Text>
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

const mapStateToProps = ({progress}: ApplicationState) => ({
  progress: progress.progress
})

const mapDispatchToProps = {
  fetchProgress
}

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(ActiveTab)