import * as React from 'react';
import Svg, { G, Path, Text, TSpan, Line} from 'react-native-svg';
import { Colors } from '../../styles/colors';
import { NavigationScreenProp } from 'react-navigation';

interface MuscleModelProps {
  navigation: NavigationScreenProp<any>
}

interface MuscleModelState {
}

export type Progress = {
  name: string
  data: MeasureData[]
}

type MeasureData = {
  value: number
  createdAt: number
}

export default class MuscleModelComponent extends React.Component<MuscleModelProps, MuscleModelState> {

  state = {
    strokeColor: Colors.secondary,
    linesColor: Colors.fontDark,
    fontColor: Colors.fontDark,
    ABS_Color: 'none',
    Chest: 'none',
    progress: {} as Progress
  }

  componentDidMount() {
    let progress: Progress = {} as Progress
    progress.name = "Chest"
    progress.data = []

    for(var i = 0; i < 30; i++) {
      let value = 90
      if(i !== 0) {
        value = progress.data[i-1].value
      }
      const date = new Date()
      date.setMonth(i)
      progress.data.push({
        createdAt: date.getTime(),
        value: value + Math.floor(Math.random() * 12) - 2
      })
    }
    this.setState({ progress })
  }

  onChestPress = () => {
    this.setState({ Chest: Colors.secondary })
    this.props.navigation.navigate('MeasureDetailsScreen', { progress: this.state.progress })
  }

  onBicepsPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  onTricepsPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  onForearmPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  onLegPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  onCalfPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  onABSPress = () => {
    this.props.navigation.navigate('MeasureDetailsScreen')
  }

  public render() {

    const { strokeColor, linesColor, fontColor } = this.state

    return (
      <Svg style={{display: 'flex', alignSelf: 'center', backgroundColor: Colors.primaryDark }} width={300} height={500} viewBox="0 0 933 1378.636">
      <G id="Group_78" transform="translate(-3667 475.668)">
        <G id="Group_76">
          <Path id="Path_38" d="M4078.305-346.694c.982,3.225,1.407,23.109,9.465,28.559s12.678,13.507,24.171,18.839,26.422,5.924,38.626,0,12.323-9.36,25.593-20.024,8.412-18.365,10.189-25.711,2.015,3.318,9.242-.829,2.871-7.315,4.073-12.371,4.155-4,4.806-12.815c.266-3.595-2.125-7.516-2.125-13.914s.564-5.034-.829-7.7c-2.353-4.505-8.945,14.139-5.924-2.725s-.593-27.252-6.754-39.693-11.67-18.043-13.626-19.906c-4.977-4.739-21.209-17.3-42.3-17.181s-32.82,8.413-41.47,17.181-9.224,12.236-13.626,19.906c-11.493,20.024-7.346,40.522-6.872,44.077s-5.45-1.777-7.82,0c-1.464,1.1-.847,5.042-.625,10.19.115,2.7-.593,5.54,0,9.767,1.552,11.063,2.289,15.469,6.194,21.426S4077.323-349.92,4078.305-346.694Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          <G id="Chest" fill={this.state.Chest} >
            <Path onPressIn={() => this.onChestPress()} onPressOut={() => this.setState({ Chest: 'none'})} id="Left_Chest" d="M4125.488-92.933c-7.821,12-55.523,42.6-94.237,30.717s-50.67-37.048-57.27-68.723,49.056-105.194,66.616-111.509,80.491,7.094,84.891,15.453S4133.309-104.933,4125.488-92.933Z" transform="translate(0 -1)" stroke={strokeColor} strokeWidth={10} />
            <Path onPressIn={() => this.onChestPress()} onPressOut={() => this.setState({ Chest: 'none'})} id="Right_Chest" d="M3978.11-92.933c7.821,12,55.523,42.6,94.237,30.717s50.67-37.048,57.27-68.723S4080.56-236.133,4063-242.448s-80.491,7.094-84.891,15.453S3970.289-104.933,3978.11-92.933Z" transform="translate(159.669 -1)" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="ABS" fill={this.state.ABS_Color} >
            <G id="ABS_Level_1">
              <Path id="Path_24" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})} d="M4127.86-39.191c-1,5.742-6.525,6.607-43.493-.383-20.311-3-6.683-19,2.6-22.513s27.617-7.9,33.414-5.723C4131.6-63.605,4128.863-44.933,4127.86-39.191Z" transform="translate(0 -1)" stroke={strokeColor} strokeWidth={10} />
              <Path id="Path_121" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})} d="M4074.849-39.191c1,5.742,6.525,6.607,43.494-.383,20.311-3,6.683-19-2.605-22.513s-27.617-7.9-33.414-5.723C4071.11-63.605,4073.847-44.933,4074.849-39.191Z" transform="translate(60.557 -1)" stroke={strokeColor} strokeWidth={10} />
            </G>
            <G id="ABS_Level_2">
              <Path id="Path_25" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})} d="M4125.855-26.621c2.188,3.1,5.1,20.781,1.367,40.467-1,4.831-16.823,3.827-31.019,1.323a67.651,67.651,0,0,1-27.11-11.244c-14.633-10.166-12.763-25.135,2.773-30.961,6.727-2.522,10.628-3.389,19.408-3.851S4123.667-29.72,4125.855-26.621Z" transform="translate(0 -4)" stroke={strokeColor} strokeWidth={10} />
              <Path id="Path_122" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})}  d="M4062.262-26.621c-2.187,3.1-5.1,20.781-1.367,40.467,1,4.831,16.823,3.827,31.019,1.323a67.648,67.648,0,0,0,27.11-11.244c14.633-10.166,12.763-25.135-2.772-30.961-6.727-2.522-10.628-3.389-19.408-3.851S4064.45-29.72,4062.262-26.621Z" transform="translate(75.149 -4)" stroke={strokeColor} strokeWidth={10} />
            </G>
            <G id="ABS_Level_3">
              <Path id="Path_26" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})} d="M4124.946,16.679c6.38-.182,5.322,13.961,5.377,26.431.042,9.261.784,16.261-5.377,17.955s-54.081-2.987-57.47-8.84c-1.8-3.106,4.286-12.3,2.9-24.079s-12.717-16.1-6.982-21.831c5.2-5.2,13.647,4.647,26.048,7.63C4106.592,18.069,4120.662,17.408,4124.946,16.679Z" transform="translate(0 -1)" stroke={strokeColor} strokeWidth={10} />
              <Path id="Path_123" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})}  d="M4067.211,16.679c-6.38-.182-5.322,13.961-5.377,26.431-.042,9.261-.784,16.261,5.377,17.955s54.082-2.987,57.47-8.84c1.8-3.106-4.286-12.3-2.9-24.079s12.717-16.1,6.981-21.831c-5.2-5.2-13.647,4.647-26.048,7.63C4085.566,18.069,4071.5,17.408,4067.211,16.679Z" transform="translate(71.108 -1)" stroke={strokeColor} strokeWidth={10} />
            </G>
            <G id="ABS_Level_4">
              <Path id="Path_32" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})} d="M4123.91,65.86c5.809.676,4.686,8.59,5.207,34.362.122,16.011-.749,39.3-2.94,50.477-4.556,23.233-9.609,9.229-25.749-12.117s-40.713-84.316-24.293-79.71S4112.717,64.558,4123.91,65.86Z" transform="translate(0 -1)" stroke={strokeColor} strokeWidth={10} />
              <Path id="Path_129" onPressIn={() => this.setState({ ABS_Color: Colors.secondary })} onPressOut={() => this.setState({ ABS_Color: 'none'})}  d="M4075.926,65.86c-5.809.676-4.686,8.59-5.207,34.362-.122,16.011.749,39.3,2.94,50.477,4.556,23.233,9.609,9.229,25.749-12.117s40.713-84.316,24.293-79.71S4087.12,64.558,4075.926,65.86Z" transform="translate(63.43 -1)" stroke={strokeColor} strokeWidth={10} />
            </G>
          </G>
          <G id="Group_65">
            <Path id="Path_27" d="M4001.12-.638c-5.931-7.9-16.8-18.33-22.786-30.624-10.923-22.44-13.187-38.59-14.134-44.83-.389-2.564,4.65-11.149,6.808-18.222,2.887-9.463-1.424-44.331,7.326-14.618s23.688,32.391,22.057,35.743c-1.641,3.372-3.314,5.322-1.632,11.982s-3.837,8.616-1.285,16.728-4.466,11.3,5.469,22.968c2.523,2.963.456,4.193,3.008,12.122C4009.082.683,4018.164,22.057,4001.12-.638Z" transform="translate(-1 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_124" d="M3974.24-.638c5.931-7.9,16.8-18.33,22.786-30.624,10.923-22.44,13.187-38.59,14.134-44.83.389-2.564-4.65-11.149-6.808-18.222-2.887-9.463,1.424-44.331-7.326-14.618s-23.688,32.391-22.057,35.743c1.641,3.372,3.314,5.322,1.632,11.982s3.837,8.616,1.285,16.728,4.466,11.3-5.469,22.968c-2.523,2.963-.456,4.193-3.008,12.122C3966.278.683,3957.2,22.057,3974.24-.638Z" transform="translate(288.906 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Shoulders">
            <Path id="Shoulder_Left" d="M3885.784-145.253c-.462-5.083,8.78-60.227,48.583-81.422,10.866-5.786,23.486-6.784,28.741-9.458,13.145-6.687,5.813-7.226,17.714-8.318,16.37-1.5,53.449,0,38.816,14.171s-29.883,31.269-42.051,60.843-5.48,37.276-8.979,40.819-5.231-4.471-22.752-2.619-30.094,6.966-46.364,8.318S3886.247-140.17,3885.784-145.253Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Shoulder_Right" d="M4022.972-145.253c.462-5.083-8.78-60.227-48.584-81.422-10.866-5.786-23.486-6.784-28.741-9.458-13.145-6.687-5.813-7.226-17.714-8.318-16.37-1.5-53.449,0-38.816,14.171s29.883,31.269,42.051,60.843,5.48,37.276,8.979,40.819,5.231-4.471,22.752-2.619,30.094,6.966,46.364,8.318S4022.51-140.17,4022.972-145.253Z" transform="translate(354.51 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_54">
            <Path id="Path_29" d="M3849.126-67c4.621-19.562,8.3-27.972,21.565-45.594,4.749-6.308,13.093-18.33,15.4-12.477s20.332,4.621,6.007,14.017-15.748,16.532-20.178,26.186c-7.442,16.217-4.334,11.11-12.785,22.335-7.323,9.727-6.161,8.318-13.247,14.941S3847.055-58.24,3849.126-67Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_126" d="M3891.526-67c-4.621-19.562-8.3-27.972-21.565-45.594-4.749-6.308-13.093-18.33-15.4-12.477s-20.333,4.621-6.008,14.017,15.749,16.532,20.178,26.186c7.442,16.217,4.334,11.11,12.785,22.335,7.323,9.727,6.161,8.318,13.247,14.941S3893.6-58.24,3891.526-67Z" transform="translate(522.615 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_55">
            <Path id="Path_30" d="M3866.225-2.156c12.615,13.016,30.406,12.511,50.523-4.929,15.711-27.726,32.347-44.361,39.279-62.075s17.1-48.366,7.7-55.914-53.3,2.31-70.393,17.1S3860.988-47.9,3860.988-47.9,3853.711-15.068,3866.225-2.156Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_127" d="M3960.182-2.156c-12.615,13.016-30.406,12.511-50.523-4.929-15.711-27.726-32.347-44.361-39.279-62.075s-17.1-48.366-7.7-55.914,53.3,2.31,70.393,17.1S3965.419-47.9,3965.419-47.9,3972.7-15.068,3960.182-2.156Z" transform="translate(436.859 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_64">
            <Path id="Path_33" d="M4094.873,139.591c2.156-1.232-23.946-45.323-26.1-66.118s-6.307-17.4-5.545-22.643,4.621-12.631,4.313-17.1-2.934-17.1-15.718-23.413c-6.856-3.956-9.707-1.733-20.332-7.085s-26.031-22.8-24.491-15.711,8.164,14.325,5.054,51.324,5.574,36.371,28.294,49.246S4092.717,140.823,4094.873,139.591Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_130" d="M4007.016,139.591c-2.156-1.232,23.946-45.323,26.1-66.118s6.307-17.4,5.545-22.643-4.621-12.631-4.313-17.1,2.934-17.1,15.718-23.413c6.856-3.956,9.707-1.733,20.332-7.085s26.031-22.8,24.491-15.711-8.164,14.325-5.054,51.324-5.574,36.371-28.294,49.246S4009.173,140.823,4007.016,139.591Z" transform="translate(161.377 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_63">
            <Path id="Path_34" d="M4024.557-57.916c14.71,5.276,21.256,2.619,36.352,8.626s7.086,13.863,0,18.484-6.392,3.042-23.721-3.543-34.4-22.473-36.553-26.016c-1.432-2.352-1.955-8.179.972-10.182S4009.847-63.192,4024.557-57.916Z" transform="translate(1 -2)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_35" d="M4026.789-60.124c16.482,8.472,26.648,11.09,29.112,14.171s2.311,8.164-2.156,12.323c-4.382,4.08-13.824,0-26.956-8.164s-23.413-20.948-25.569-24.491c-1.432-2.352-2.156-8.01.77-10.012S4010.307-68.6,4026.789-60.124Z" transform="translate(-1 20)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_36" d="M4030.332-57.941c16.635,9.7,16.944,5.391,22.027,7.856s8.164,8.934,3.851,10.936-12.746,2.927-25.877-5.237-24.491-19.87-26.648-23.413c-1.432-2.352-5.391-9.7-2.465-11.706S4013.7-67.645,4030.332-57.941Z" transform="translate(-1 42)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_131" d="M4044.406-57.916c-14.71,5.276-21.256,2.619-36.352,8.626s-7.086,13.863,0,18.484,6.392,3.042,23.721-3.543,34.4-22.473,36.553-26.016c1.432-2.352,1.955-8.179-.972-10.182S4059.116-63.192,4044.406-57.916Z" transform="translate(193.303 -2)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_132" d="M4030.677-60.124c-16.482,8.472-26.648,11.09-29.112,14.171s-2.311,8.164,2.156,12.323c4.382,4.08,13.824,0,26.956-8.164s23.413-20.948,25.569-24.491c1.432-2.352,2.156-8.01-.77-10.012S4047.158-68.6,4030.677-60.124Z" transform="translate(206.801 20)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_133" d="M4028.094-57.941c-16.635,9.7-16.944,5.391-22.027,7.856s-8.164,8.934-3.851,10.936,12.746,2.927,25.877-5.237,24.491-19.87,26.648-23.413c1.432-2.352,5.391-9.7,2.465-11.706S4044.729-67.645,4028.094-57.941Z" transform="translate(205.841 42)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_52">
            <Path id="Path_37" d="M4016.57-265.989c34.642-24.43,60.631-41.306,64.636-37.9s-2.479,51.786-5.282,54.79-31.934,2.337-51.462,2.2C4007.525-247.015,3981.928-241.56,4016.57-265.989Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_134" d="M4065.27-265.989c-34.642-24.43-60.631-41.306-64.636-37.9s2.479,51.786,5.282,54.79,31.934,2.337,51.462,2.2C4074.314-247.015,4099.912-241.56,4065.27-265.989Z" transform="translate(181.427 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_66">
            <Path id="Path_39" d="M4043.335,475.65c-11.068-10.619-15.113-56.507-9.174-99.51s16.105-116.443,22.42-111.976c2.956,2.091,17.728,43.62,27.88,82.869,11.5,44.466,18.638,54.989,18.638,64.077s.06,68.13-14.787,78.248S4054.733,486.586,4043.335,475.65Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_135" d="M4091.192,475.65c11.067-10.619,15.113-56.507,9.174-99.51s-16.105-116.443-22.421-111.976c-2.956,2.091-17.728,43.62-27.88,82.869-11.5,44.466-18.638,54.989-18.638,64.077s-.06,68.13,14.787,78.248S4079.794,486.586,4091.192,475.65Z" transform="translate(128.739 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_67">
            <Path id="Path_40" d="M4003.025,239.088c-3.8-1.6-7.209,12.615-16.019,70.285s4.806,84.9,6.007,112.936,16.42,42.051,25.03,31.838,15.861-19.6,9.812-73.489S4006.829,240.69,4003.025,239.088Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_136" d="M4011.116,239.088c3.8-1.6,7.209,12.615,16.019,70.285s-4.806,84.9-6.007,112.936-16.42,42.051-25.03,31.838-15.861-19.6-9.812-73.489S4007.312,240.69,4011.116,239.088Z" transform="translate(249.125 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_75">
            <Path id="Path_41" d="M4019.9,498.817c-1.767,29.031-5.208,44.877,3.11,50.923s24.589,5.612,27.88-2.465c3.389-8.318,5.237-11.09,9.4-34.965S4021.665,469.786,4019.9,498.817Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_137" d="M4058.34,498.817c1.767,29.031,5.208,44.877-3.11,50.923s-24.589,5.612-27.88-2.465c-3.389-8.318-5.237-11.09-9.4-34.965S4056.573,469.786,4058.34,498.817Z" transform="translate(185.029 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_72">
            <Path id="Path_42" d="M4079.25,613.659c-1.078-16.934-1.959-30.11-1.063-39.52s-6.136,3.363-12.342,34.774c-8.864,44.873-7.985,72.148-4.544,112.842s2.65,110.994,11.635,54.023C4081.994,718.347,4082.842,670.106,4079.25,613.659Z" transform="translate(-6 1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_138" d="M4060.832,613.659c1.078-16.934,1.959-30.11,1.063-39.52s6.136,3.363,12.342,34.774c8.864,44.873,7.985,72.148,4.544,112.842s-2.65,110.994-11.635,54.023C4058.087,718.347,4057.239,670.106,4060.832,613.659Z" transform="translate(129.185 1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_70">
            <Path id="Path_44" d="M4105.549,404.287c2.2,22.427,10.413-31.238,18.422-55.267s7.053-86.678-4.863-117.036S4085.2,178.752,4082,194.371s-19.5,54.329-6.886,101.986S4103.346,381.86,4105.549,404.287Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_140" d="M4094.013,404.287c-2.2,22.427-10.413-31.238-18.422-55.267s-7.053-86.678,4.863-117.036,33.905-53.233,37.109-37.614,19.5,54.329,6.886,101.986S4096.216,381.86,4094.013,404.287Z" transform="translate(63.704 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_68">
            <Path id="Path_45" d="M4031.059,349.421c-6.208,2-11.414-65.279-21.626-120.545s4.205-126.352,12.615-118.343c3.373,3.212,16.719,10.615,28.9,25.271,17.719,21.319,33.384,55.769,14.552,93.071C4034.063,291.152,4037.267,347.419,4031.059,349.421Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_141" d="M4048.9,349.421c6.208,2,11.414-65.279,21.626-120.545s-4.205-126.352-12.615-118.343c-3.373,3.212-16.719,10.615-28.9,25.271-17.719,21.319-33.384,55.769-14.552,93.071C4045.894,291.152,4042.69,347.419,4048.9,349.421Z" transform="translate(183.31 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_53">
            <Path id="Path_47" d="M4088.111-314.342c-10.427-12.678-8.005.942,3.081,23.816s39.1,72.632,38.626,53.319-1.777-30.1-9.36-45.143S4098.538-301.665,4088.111-314.342Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_142" d="M4123.166-314.342c10.426-12.678,8,.942-3.081,23.816s-39.1,72.632-38.626,53.319,1.777-30.1,9.36-45.143S4112.739-301.665,4123.166-314.342Z" transform="translate(51.99 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_69">
            <Path id="Path_48" d="M3981.61,320.587c-1.452,27.823-6.6-21.544,0-64.183s26.546-140.129,23.141-109.492-2.521,68.548-7.126,88.372S3983.062,292.764,3981.61,320.587Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_143" d="M4001.856,320.587c1.452,27.823,6.6-21.544,0-64.183s-26.546-140.129-23.141-109.492,2.521,68.548,7.126,88.372S4000.4,292.764,4001.856,320.587Z" transform="translate(279.8 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_73">
            <Path id="Path_49" d="M4016.882,637.663c8.861,36.756,18.706,91.561,24.285,135.865s10.7,64.209,12.79,29.345-13.6-97.808-18.647-151.831-14.894-40.9-19.943-69.674S4008.021,600.907,4016.882,637.663Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_144" d="M4048.169,637.663c-8.861,36.756-18.706,91.561-24.285,135.865s-10.7,64.209-12.79,29.345,13.6-97.808,18.647-151.831,14.894-40.9,19.943-69.674S4057.03,600.907,4048.169,637.663Z" transform="translate(198.216 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_74">
            <Path id="Path_50" d="M4021.893,901.442c7.7.474,10.071-3.555,20.379-4.266s4.74-4.621,12.56-4.5,10.47-3.8,10.47-3.8,5.666-5.223,6.408-10.813c.476-3.584-4.082-6.582-3.4-12.215,1.6-13.316,3.2-23.228,3.4-30.236s-3.8-18.823-6.408-22.427-4.653,8.079-16.75,15.748-31.636,14.929-31.636,14.929a17.218,17.218,0,0,0-6.161,5.45,40.557,40.557,0,0,0-4.124,8.768,28.222,28.222,0,0,1-10.805,12.086c-8.057,5.095-12.8,8.468-18.128,11.73-12.2,7.465-8.5,13.691-7.7,14.692s3.081,2.133,7.109,1.659,3.358.571,6.4.948,3.7.237,8.057,0,4.606-1.706,5.806-.948a16.945,16.945,0,0,0,9.265,2.133c6.151-.5,4.945-2.99,5.783-2.694C4014.665,898.48,4014.191,900.969,4021.893,901.442Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_145" d="M4018.7,901.442c-7.7.474-10.071-3.555-20.379-4.266s-4.74-4.621-12.56-4.5-10.47-3.8-10.47-3.8-5.666-5.223-6.408-10.813c-.476-3.584,4.082-6.582,3.4-12.215-1.6-13.316-3.2-23.228-3.4-30.236s3.8-18.823,6.408-22.427,4.653,8.079,16.75,15.748,31.636,14.929,31.636,14.929a17.218,17.218,0,0,1,6.161,5.45,40.557,40.557,0,0,1,4.124,8.768,28.222,28.222,0,0,0,10.805,12.086c8.057,5.095,12.8,8.468,18.128,11.73,12.2,7.465,8.5,13.691,7.7,14.692s-3.081,2.133-7.109,1.659-3.358.571-6.4.948-3.7.237-8.057,0-4.606-1.706-5.806-.948a16.945,16.945,0,0,1-9.265,2.133c-6.151-.5-4.945-2.99-5.783-2.694C4025.924,898.48,4026.4,900.969,4018.7,901.442Z" transform="translate(222.678 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_56">
            <Path id="Path_31" d="M3845.615-34.58c-.781-9.632-25.559.609-35.646,21.3s-11.992,31.539-11.211,50.282,8.851,24.469,14.057,32.019,19.523,13.091,30.717,6.768,4.551-57.909,3.384-83.821S3846.4-24.949,3845.615-34.58Z" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_52" d="M3889.868,18.222c10.673-5.467-6.313,36.509-21.866,61.955s-21.606,26.552-38.526,42.171-.586-12.17,3.9-21.606,10.022-9.306,17.441-24.469.651-45.425,11.714-61.434S3879.2,23.689,3889.868,18.222Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_53" d="M3796.416,41.39c-2.6-21.346-35.011,83.1-39.7,106.788s21.28-40.538,33.71-52.9,30.977-8.59,22.127-20.3S3799.019,62.736,3796.416,41.39Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_128" d="M3802.922-34.58c.781-9.632,25.559.609,35.646,21.3s11.992,31.539,11.211,50.282-8.851,24.469-14.057,32.019S3816.2,82.115,3805,75.793s-4.551-57.909-3.384-83.821S3802.141-24.949,3802.922-34.58Z" transform="translate(614.73)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_146" d="M3825.305,18.222c-10.673-5.467,6.313,36.509,21.866,61.955s21.606,26.552,38.526,42.171.586-12.17-3.9-21.606-10.022-9.306-17.441-24.469-.651-45.425-11.714-61.434S3835.979,23.689,3825.305,18.222Z" transform="translate(548.093 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_147" d="M3774.611,41.39c2.6-21.346,35.011,83.1,39.7,106.788s-21.28-40.538-33.71-52.9-30.977-8.59-22.127-20.3S3772.008,62.736,3774.611,41.39Z" transform="translate(692.24 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_57">
            <Path id="Path_54" d="M3786.1,208.651c1.523,3.892-.948,15.018,1.855,22.227s3,16.42,11.614,18.022,10.634-2.2,11.235-5.407-2.224-16.208-2.224-28.943,1.376-11.419,1-21.318.244-9.014-3-17.221-7.152-13.119-20.478-17.02-23.175,3.4-29.983,2.8-11.607,24.767-18.409,39.648-4.018,12.014-6.43,17.221-1.193,11.013,0,17.621,3.413,7.209,5.015,16.82c.357,2.143-.2,8.21,5.206,13.216s8.473,14.725,13.616,19.634,6.608-.611,7.809,1.191,5.14,10.606,9.411,13.016,5.754.174,7.672-3.378.461-7.156,1.138-11.64,1.892-3.8,0-7.409-5.974-3.164-9.812-12.615-3.813-14.655-4.606-23.829.285-7.332,3.6-14.017,5.733-7.935,9.675-12.723S3784.582,204.759,3786.1,208.651Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_148" d="M3754.682,208.651c-1.523,3.892.948,15.018-1.855,22.227s-3,16.42-11.614,18.022-10.634-2.2-11.235-5.407,2.224-16.208,2.224-28.943-1.376-11.419-1-21.318-.244-9.014,3-17.221,7.152-13.119,20.478-17.02,23.175,3.4,29.983,2.8,11.607,24.767,18.409,39.648,4.018,12.014,6.43,17.221,1.193,11.013,0,17.621-3.413,7.209-5.015,16.82c-.357,2.143.2,8.21-5.206,13.216s-8.473,14.725-13.616,19.634-6.608-.611-7.809,1.191-5.14,10.606-9.411,13.016-5.754.174-7.672-3.378-.461-7.156-1.138-11.64-1.892-3.8,0-7.409,5.974-3.164,9.812-12.615,3.813-14.655,4.606-23.829-.285-7.332-3.6-14.017-5.733-7.935-9.675-12.723S3756.2,204.759,3754.682,208.651Z" transform="translate(722.481 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_58">
            <Path id="Path_55" d="M3798.769,160.393c-6.208-1.4-18.823-9.812-28.234-5.607s6.808-33.741,19.023-50.661,51.863-27.033,43.452-13.817S3804.977,161.795,3798.769,160.393Z" transform="translate(0 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_149" d="M3803.124,160.393c6.208-1.4,18.823-9.812,28.234-5.607s-6.808-33.741-19.023-50.661-51.863-27.033-43.452-13.817S3796.917,161.795,3803.124,160.393Z" transform="translate(661.373 -1)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
          <G id="Group_71">
            <Path id="Path_43" d="M4001.114,567.823c-9.845,39.709-15.157,39.977-7.548,83.029s31.68,130.484,35.685,146.1-12.517-78.01-17.924-108.046-8.723-29.524-8.331-59.324S4010.959,528.113,4001.114,567.823Z" transform="translate(1 -5)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_88" d="M4084.058,647.241c.075,23.309-.187,30.527,4.631,24.946,4.344-5.023,13.77-22.477,13.892-36.447.142-16.313-3.884-17.626-8.066-33.609s-4.631-11.8-8.388-37.792S4083.908,601.084,4084.058,647.241Z" transform="translate(-5 2)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_139" d="M4018.708,567.823c9.845,39.709,15.157,39.977,7.548,83.029s-31.68,130.484-35.685,146.1,12.517-78.01,17.924-108.046,8.723-29.524,8.331-59.324S4008.863,528.113,4018.708,567.823Z" transform="translate(242.445 -5)" fill="none" stroke={strokeColor} strokeWidth={10} />
            <Path id="Path_150" d="M4102.146,647.241c-.076,23.309.187,30.527-4.63,24.946-4.344-5.023-13.771-22.477-13.892-36.447-.142-16.313,3.884-17.626,8.066-33.609s4.631-11.8,8.388-37.792S4102.3,601.084,4102.146,647.241Z" transform="translate(82.063 2)" fill="none" stroke={strokeColor} strokeWidth={10} />
          </G>
        </G>
        <G xmlns="http://www.w3.org/2000/svg" id="Group_77" data-name="Group 77">
          <G id="Group_41" data-name="Group 41">
            <Line id="Line_21" data-name="Line 21" x1="81" y1="81" transform="translate(3814.5 -138.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Path id="Path_152" data-name="Path 152" d="M0,0H145.256" transform="translate(3668.932 -138.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_45" data-name="45" transform="translate(3680 -148)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">45</TSpan></Text>
          </G>
          <G id="Group_42" data-name="Group 42" transform="translate(-44 155)">
            <Path id="Path_151" data-name="Path 151" d="M48.027,48.027,0,0" transform="translate(3822.5 -182.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22" data-name="Line 22" x2="110" transform="translate(3712.5 -182.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_41" data-name="41" transform="translate(3724 -192)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">41</TSpan></Text>
          </G>
          <G id="Group_43" data-name="Group 43" transform="translate(81 -193)">
            <Line id="Line_21-2" data-name="Line 21" x1="176" y1="176" transform="translate(3813.5 -174.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-2" data-name="Line 22" x2="225" transform="translate(3588.5 -174.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_110" data-name="110" transform="translate(3600 -184)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">110</TSpan></Text>
          </G>
          <G id="Group_44" data-name="Group 44" transform="translate(46 -86)">
            <Line id="Line_21-3" data-name="Line 21" x1="81" y1="81" transform="translate(3813.5 -169.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-3" data-name="Line 22" x2="190" transform="translate(3623.5 -169.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_130" data-name="130" transform="translate(3635 -179)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">130</TSpan></Text>
          </G>
          <G id="Group_46" data-name="Group 46" transform="translate(4261.5 479)">
            <Line id="Line_21-4" data-name="Line 21" y1="96" x2="96" transform="translate(-40 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-4" data-name="Line 22" x1="84" transform="translate(56 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_41-2" data-name="41" transform="translate(67.5 56)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">41</TSpan></Text>
          </G>
          <G id="Group_47" data-name="Group 47" transform="translate(4270.5 153)">
            <Line id="Line_21-5" data-name="Line 21" y1="93" x2="93" transform="translate(-37 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-5" data-name="Line 22" x1="84" transform="translate(56 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_41-3" data-name="41" transform="translate(67.5 56)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">41</TSpan></Text>
          </G>
          <G id="Group_48" data-name="Group 48" transform="translate(4196.5 -431)">
            <Line id="Line_21-6" data-name="Line 21" y1="100" x2="100" transform="translate(-44 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-6" data-name="Line 22" x1="345" transform="translate(56 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_60" data-name="60" transform="translate(332.5 55)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">60</TSpan></Text>
          </G>
          <G id="Group_49" data-name="Group 49" transform="translate(-61 260)">
            <Line id="Line_21-7" data-name="Line 21" x1="38" y1="38" transform="translate(3813.5 -174.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-7" data-name="Line 22" x2="84" transform="translate(3729.5 -174.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_20" data-name="20" transform="translate(3742 -184)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">20</TSpan></Text>
          </G>
          <G id="Group_79" data-name="Group 79" transform="translate(4476.5 22)">
            <Line id="Line_21-8" data-name="Line 21" y1="38" x2="38" transform="translate(0 65.5)" fill="none"/>
            <Line id="Line_22-8" data-name="Line 22" x1="84" transform="translate(38 65.5)" fill="none"/>
          </G>
          <G id="Group_80" data-name="Group 80" transform="translate(4318.5 -200)">
            <Line id="Line_21-9" data-name="Line 21" y1="197" x2="197" transform="translate(-96 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Line id="Line_22-9" data-name="Line 22" x1="179" transform="translate(101 65.5)" fill="none" stroke={linesColor} strokeLinecap="round" strokeWidth={10}/>
            <Text id="_60-2" data-name="60" transform="translate(211.5 56)" fill={fontColor} fontSize="52" fontFamily="MyanmarText-Bold, Myanmar Text" fontWeight="700"><TSpan x="0" y="0">60</TSpan></Text>
          </G>
        </G>
      </G>
    </Svg>
    );
  }
}
