import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Slider,
  TouchableOpacity,
  Alert,
  Button,
  AsyncStorage,
  Image
} from 'react-native';

class UserPref extends Component {

  constructor(props) {
    super(props);
    this.goCheapest = this.goCheapest.bind(this);
    this.goWalking = this.goWalking.bind(this);
    this.goFastest = this.goFastest.bind(this);
    this.okFunc = this.okFunc.bind(this);
    this.typeConverter = this.typeConverter.bind(this);
    this.state = {
      origin: "",
      destination: "",
      cheapestTyp: [],
      typs: [],
      minWalk: [],
      fast: [],
      chps: [],
      f_ind: 0,
      m_ind: 0,
      walk_list: [],
      dur_list: [],
      chp_list: 0,
      costs: [],
      moneyBarMin: "",
      moneyBarMax: "",
      moneyBarMinUser: 0,
      cheapestInfos: [],
      sendingMoney: 0,
    };

    AsyncStorage.getItem('types').then((value) => {
      value = JSON.parse(value);
      this.setState({ typs: value });
    });
    AsyncStorage.getItem('cheapestInfo').then((value) => {
      value = JSON.parse(value);
      this.setState({ cheapestInfos: value });
    });
    AsyncStorage.getItem('costList').then((value) => {
      value = JSON.parse(value);
      this.setState({ costs: value });
    });
    AsyncStorage.getItem('typesCheapest').then((value) => {
      value = JSON.parse(value);
      this.setState({ chps: value });
    });
    AsyncStorage.getItem('walkingList').then((value) => {
      value = JSON.parse(value);
      this.setState({ walk_list: value });
    });
    AsyncStorage.getItem('durationList').then((value) => {
      value = JSON.parse(value);
      this.setState({ dur_list: value });
    });
    AsyncStorage.getItem('fastestInd').then((value) => {
      this.setState({ f_ind: value });
    });
    AsyncStorage.getItem('minWalkInd').then((value) => {
      this.setState({ m_ind: value });
    });
    AsyncStorage.getItem('cheapestInd').then((value) => {
      this.setState({ chp_ind: value });
    });
    AsyncStorage.getItem('barMin').then((value) => {
      this.setState({ moneyBarMin: value });
      this.state.moneyBarMin = parseInt(this.state.moneyBarMin, 10) + 0.5;
    });
    AsyncStorage.getItem('barMax').then((value) => {
      this.setState({ moneyBarMax: value });
      this.state.moneyBarMax = parseInt(this.state.moneyBarMax, 10) + 1;
    });

    setTimeout(this.typeConverter, 300);
  }
  typeConverter() {
    var arr = [];
    for (i = 0; i < this.state.typs[this.state.f_ind].length; i++) {
      arr[i] = this.state.typs[this.state.f_ind][i];
    }
    this.setState({ fast: arr });

    var arr2 = [];
    for (i = 0; i < this.state.typs[this.state.m_ind].length; i++) {
      arr2[i] = this.state.typs[this.state.m_ind][i];
    }
    this.setState({ minWalk: arr2 });
  }
  goCheapest() {
    this.props.navigator.push({
      id: 'CheapestResult',
      name: 'CheapestResult',
    });
  }

  goWalking() {
    this.props.navigator.push({
      id: 'MinWalkResult',
      name: 'MinWalkResult',
    });
  }

  goFastest() {
    this.props.navigator.push({
      id: 'FastestResult',
      name: 'FastestResult',
    });
  }
  okFunc() {
    AsyncStorage.setItem('sendingMoney', this.state.moneyBarMinUser.toString());
    AsyncStorage.setItem('sendingMoneyMin', this.state.moneyBarMin.toString());
    AsyncStorage.setItem('sendingMoneyMax', this.state.moneyBarMax.toString());
    this.props.navigator.push({
      id: 'LoadingPrefTaxi',
      name: 'LoadingPrefTaxi',
    });
  }

  render() {

    var printCheapest = [];
    var printMinWalk = [];
    var printFastest = [];
    var walk_flag = true;
    var bus_flag = true;
    var subway_flag = true;
    var taxi_flag = true;
    for (let i = 0; i < this.state.chps.length; i++) {
      if (this.state.chps[i] == 'WALKING' && walk_flag) {
        printCheapest.push(
          <Image style={styles.thumb} source={require('./walking.png')} />
        )
        walk_flag = false;
      } else if (this.state.chps[i] == 'BUS' && bus_flag) {
        printCheapest.push(
          <Image style={styles.thumb} source={require('./bus.png')} />
        )
        bus_flag = false;
      } else if (this.state.chps[i] == 'SUBWAY' && subway_flag) {
        printCheapest.push(
          <Image style={styles.thumb} source={require('./subway.png')} />
        )
        subway_flag = false;
      } else if (this.state.chps[i] ==  'TAXI' && taxi_flag){
        printCheapest.push(
          <Image style={styles.thumb} source={require('./taxi.png')} />
        )
        taxi_flag = false;
      }
    }
    var walk_flag = true;
    var bus_flag = true;
    var subway_flag = true;
    var taxi_flag = true;
    for (let i = 0; i < this.state.minWalk.length; i++) {
      if (this.state.minWalk[i] == 'WALKING' && walk_flag) {
        printMinWalk.push(
          <Image style={styles.thumb} source={require('./walking.png')} />
        )
        walk_flag = false;
      } else if (this.state.minWalk[i] == 'BUS' && bus_flag) {
        printMinWalk.push(
          <Image style={styles.thumb} source={require('./bus.png')} />
        )
        bus_flag = false;
      } else if (this.state.minWalk[i] == 'SUBWAY' && subway_flag) {
        printMinWalk.push(
          <Image style={styles.thumb} source={require('./subway.png')} />
        )
        subway_flag = false;
      } else if (this.state.minWalk[i] == 'TAXI' && taxi_flag){
        printMinWalk.push(
          <Image style={styles.thumb} source={require('./taxi.png')} />
        )
        taxi_flag = false;
      }
    }

    var walk_flag = true;
    var bus_flag = true;
    var subway_flag = true;
    var taxi_flag = true;
    for (let i = 0; i < this.state.fast.length; i++) {
      if (this.state.fast[i] == 'WALKING' && walk_flag) {
        printFastest.push(
          <Image style={styles.thumb} source={require('./walking.png')} />
        )
        walk_flag = false;
      } else if (this.state.fast[i] == 'BUS' && bus_flag) {
        printFastest.push(
          <Image style={styles.thumb} source={require('./bus.png')} />
        )
        bus_flag = false;
      } else if (this.state.fast[i] == 'SUBWAY' && subway_flag) {
        printFastest.push(
          <Image style={styles.thumb} source={require('./subway.png')} />
        )
        subway_flag = false;
      } else if (this.state.fast[i] == 'TAXI' && taxi_flag){
        printFastest.push(
          <Image style={styles.thumb} source={require('./taxi.png')} />
        )
        taxi_flag = false;
      }
    }
    return (
      <View style={styles.flexContainer1}>

        <TouchableOpacity onPress={() => this.goCheapest()}>
          <View style={{ height: 127, backgroundColor: 'white' }}>
            <View style={styles.flexItemContainer}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{ fontFamily: 'Courier', fontSize: 20, fontWeight: 'bold', color: 'lightskyblue' }}>Cheapest</Text>
                <View style={styles.textContainer}>
                  <Text>{"Duration: " + (parseInt((this.state.cheapestInfos[0] / 60), 10) + 1 ) + " min"}</Text>
                  <Text>{"Walking Distance: " + this.state.cheapestInfos[1] + "m"}</Text>
                  <Text>{"Cost: " + ((parseInt(this.state.cheapestInfos[2],10)) + 0.5) + "TL"}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center'
                }}>
                  {printCheapest}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.goFastest()}>
          <View style={{ height: 127, backgroundColor: 'white' }}>
            <View style={styles.flexItemContainer}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{ fontFamily: 'Courier', fontSize: 20, fontWeight: 'bold', color: 'lightskyblue' }}>Fastest</Text>
                <View style={styles.textContainer}>

                  <Text>{"Duration: " + (parseInt((this.state.dur_list[this.state.f_ind] / 60), 10) + 1 ) + " min"}</Text>
                  <Text>{"Walking Distance: " + this.state.walk_list[this.state.f_ind] + "m"}</Text>
                  <Text>{"Cost: " + ((parseInt(this.state.costs[this.state.f_ind],10)) + 0.5) + "TL"}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center'
                }}>
                  {printFastest}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.goWalking()}>
          <View style={{ height: 127, backgroundColor: 'white' }}>
            <View style={styles.flexItemContainer}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{ fontFamily: 'Courier', fontSize: 20, fontWeight: 'bold', color: 'lightskyblue' }}>Minimum Walking</Text>
                <View style={styles.textContainer}>
                  <Text>{"Duration: " + (parseInt((this.state.dur_list[this.state.m_ind] / 60), 10) + 1 ) + " min"}</Text>
                  <Text>{"Walking Distance: " + this.state.walk_list[this.state.m_ind] + "m"}</Text>
                  <Text>{"Cost: " + ((parseInt(this.state.costs[this.state.m_ind],10)) + 0.5) + "TL"}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center'
                }}>
                  {printMinWalk}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ height: 80, backgroundColor: 'white' }}>
        
            <Text style={{ fontFamily: 'Courier', fontSize: 20, fontWeight: 'bold', color: 'lightskyblue', alignSelf: 'center' }}>Money</Text>
            <Slider
              style = {{ tintColor: 'lightskyblue', minimumValue: 0, maximumValue: 100, value: '0' }}
              minimumValue={0}
              value={0}
              maximumValue={50}
              step={1}
              onValueChange={(moneyBarMinUser) => this.setState({ moneyBarMinUser: moneyBarMinUser }) }
              />
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5,marginBottom:10}}>
            <Text style ={{ fontFamily: 'Courier', fontSize: 15, fontWeight: 'bold', color: 'lightskyblue'}}>
              {this.state.moneyBarMin} TL</Text>
            <Text style ={{ fontFamily: 'Courier', fontSize: 15, fontWeight: 'bold', color: 'lightskyblue'}}>
              {(((this.state.moneyBarMax-this.state.moneyBarMin)/50*this.state.moneyBarMinUser)+this.state.moneyBarMin)} TL</Text>
            <Text style ={{ fontFamily: 'Courier', fontSize: 15, fontWeight: 'bold', color: 'lightskyblue' }}>
              {this.state.moneyBarMax} TL</Text>
            </View>
             </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.okFunc()}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
      
        

      </View>
    );
  }
}

const styles = StyleSheet.create({

  flexContainer1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 56,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  flexItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  thumb: {
    alignSelf: 'center',
    height: 40,
    width: 40,
  },
  button: {
    borderColor: '#4099FF',
    borderWidth: 1,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#4099FF',
  },
  buttonText: {
    color: '#3e0f2f',
  },
});

module.exports = UserPref;
