import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Progress } from '../../components/MuscleModel';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import Spinner from '../../components/Spinner';
import * as scale from 'd3-scale'
import { Defs, Stop, LinearGradient, Path } from 'react-native-svg';
import Fonts from '../../styles/Fonts';
import dateFns from 'date-fns'
import { Colors } from '../../styles/colors';
import H3 from '../../components/Headings/H3';
import H4 from '../../components/Headings/H4';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<MeasureDetailsScreen>
}

const verticalContentInset = { top: 10, bottom: 10 }

class MeasureDetailsScreen extends Component<Props> {

  state = {
    progress: {} as Progress
  }

  static navigationOptions = (props: NavigationScreenProps) => {
    let profile: Progress = props.navigation.getParam('progress')
    return {
      title: profile.name
    }
  }

  componentDidMount() {
    const progress: Progress = this.props.navigation.getParam('progress')
    this.setState({ progress })
  }
  
  render() {
    if(!this.state.progress.data) {
      return <Spinner/>
    }

    const Gradient = () => (
      <Defs key={'gradient'}>
          <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
              <Stop offset={'0%'} stopColor={'yellow'}/>
              <Stop offset={'100%'} stopColor={'red'}/>
          </LinearGradient>
      </Defs>
    )

    return (
      <View style={{ display: 'flex', flex: 1}}>
        <View style={{ height: 250, padding: 5, paddingRight: 15, flexDirection: 'row', backgroundColor: Colors.primaryLight }}>
          <YAxis
            data={this.state.progress.data.map(x => x.value)}
            numberOfTicks={6}
            contentInset={verticalContentInset}
            style={{ marginBottom: 20 }}
            svg={{
              fill: 'gray',
              fontSize: 11,
              fontWeight: 'bold',
              fontFamily: Fonts.ubuntuBold
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <LineChart
              style={{ flex: 1 }}
              data={this.state.progress.data}
              yAccessor={ ({ item }) => item.value }
              xAccessor={ ({ item }) => item.createdAt }
              contentInset={verticalContentInset}
              svg={{ stroke: 'url(#gradient)', strokeWidth: 4 }}
              curve={ shape.curveBasis }
              animate
              animationDuration={300}
            >
              <Gradient />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: 30 }}
              data={this.state.progress.data}
              xAccessor={ ({ item }) => item.createdAt }
              numberOfTicks={5}
              contentInset={{ left: 10, right: 25 }}
              formatLabel={ (value) => dateFns.format(new Date(value), 'DD.MM.YY') }
              svg={{
                fill: 'gray',
                fontSize: 11,
                fontWeight: 'bold',
                fontFamily: Fonts.ubuntuBold,
                rotation: 0,
                originY: 30,
                y: 5,
              }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: Colors.primaryLight, display: 'flex', flex: 1 }}>
          <ScrollView>
            {
              this.state.progress.data.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0).map((x, i) => (
                <View key={i} style={{ height: 30, marginLeft: 10, marginRight: 10, marginBottom: 5, backgroundColor: 'rgba(80,80,80, .2)', borderRadius: 5, justifyContent: 'center'}}>
                  <H4 style={{padding: 6}}>{new Date(x.createdAt).toLocaleDateString()}: {x.value} cm</H4>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </View>

    )
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDetailsScreen)
