import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { fetchProgress, handleProgressModal, setLastProgress } from '../../../store/progress/actions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PRIMARY_COLOR } from '../../../styles/common'
import ProgressModal from './ProgressModal'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { progressNormalize, progressSort } from '../../../utils/progress'
import { capFirst } from '../../../utils/string'
import progressConfig from '../../../config/progressConfig'

import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import dateFns from 'date-fns'
import { NavigationScreenProp } from 'react-navigation';
import { Progress, ProgressKey } from '../../../store/progress/types';

interface Props {
  setLastProgress(value: number): Function
  handleProgressModal(): Function
  navigation: NavigationScreenProp<ActiveTab>
  onFetch: Function
  progress: Progress[]
  selectedProgress: ProgressKey
}

class ActiveTab extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Progress',
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
    this.props.navigation.setParams({
      onProgressAddOpen: this._onProgressAddOpen
    })
    this.props.onFetch();
  }

  _onProgressAddOpen = () => {
    this.props.navigation.navigate('AddProgressScreen')
  }
  
  render() {
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    const progress = progressNormalize(this.props.progress, this.props.selectedProgress)
    const sortedProgress = progressSort(progress);
    this.props.setLastProgress(sortedProgress[0]? sortedProgress[0].value : 0)

    const reactProgress = sortedProgress.map((progress, i) => 
      <View key={i} style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.2)', padding: 20}}>
        <Text>{progress.date.toLocaleDateString()}</Text>
        <Text style={{ color: 'gray'}} >{progress.value} cm</Text>
      </View>
    )
    
    return (
      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
          <TouchableOpacity onPress={() => this.props.handleProgressModal()} style={{...styles.button, ...styles.buttonRight}}>
            <Text>{capFirst(progressConfig[this.props.selectedProgress].label)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Wszyscy</Text>
          </TouchableOpacity>
        </View>
        <ProgressModal />

        <ScrollView>
          <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
          {/* FIXME: remove gray x axis beginning start value and y axis last balue  */}
            <YAxis
                data={sortedProgress}
                yAccessor={ ({ item }) => item.value }
                numberOfTicks={ 6 }
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={{ fontSize: 10, fill: 'grey' }}
            />
            <View style={{ flex: 1, marginLeft: 5 }}>
            {/* FIXME: proper scale value x and y axis */}
              <LineChart
                  style={{ flex: 1 }}
                  data={sortedProgress}
                  // xScale={ scale.scaleUtc }
                  yAccessor={ ({ item }) => item.value }
                  xAccessor={ ({ item }) => item.date }
                  contentInset={verticalContentInset}
                  svg={{ stroke: 'black' }}
                  curve={ shape.curveLinear }
              >
                <Grid/>
              </LineChart>
              <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight }}
                  data={sortedProgress} 
                  // scale={ scale.scaleUtc }
                  numberOfTicks={ 6 }
                  xAccessor={ ({ item }) => item.date }
                  formatLabel={ (value) => dateFns.format(value, 'DD.MM.YYYY') }
                  contentInset={{ left: 25, right: 25 }}
                  svg={{
                    fill: 'grey',
                    fontSize: 8,
                    fontWeight: 'bold',
                    rotation: 0,
                    originY: 30,
                    y: 5,
                  }}
              />
            </View>
          </View>
          {reactProgress}
        </ScrollView>
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
    backgroundColor: PRIMARY_COLOR
  },
  title: {
    alignSelf: 'center',
    paddingLeft: 20,
    color: 'white',
    fontSize: 20
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // ios
    alignItems: 'center',
    shadowOffset: {width: 0, height: 13}, 
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // android
    elevation: 2,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    backgroundColor: 'white',
  },
  buttonRight: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.2)'
  },
  buttonText: {    
  }
})

const mapStateToProps = ({Progress}) => ({
  progress: Progress.progress,
  progressLoading: Progress.progressLoading,
  selectedProgress: Progress.selectedProgress
})

const mapDispatchToProps = (dispatch) => ({
  handleProgressModal: () => handleProgressModal()(dispatch),
  onFetch: () => fetchProgress()(dispatch),
  setLastProgress: (value) => setLastProgress(value)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTab)