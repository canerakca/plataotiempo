
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  AsyncStorage,
  Button
} from 'react-native';

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

class RouteSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      
    };  
   

    this.funcRec = this.funcRec.bind(this);
    setTimeout(this.funcRec, 200);
    AsyncStorage.getItem('origin').then((value) => {
      this.setState({ origin: value });
    });
    AsyncStorage.getItem('destination').then((value) => {
      this.setState({ destination: value });
    });
  }


  funcRec() {
    AsyncStorage.getItem('origin').then((value) => {
      this.setState({ origin: value });
      console.log(this.state.origin);
    });
    AsyncStorage.getItem('destination').then((value) => {
      this.setState({ destination: value });
      console.log(this.state.destination);
    });
    AsyncStorage.getItem('flag').then((value) => {
      this.setState({ flag: value });
      console.log(this.state.flag);
    });
  }

  goToNext() {
    this.props.navigator.push({
      id: 'LoadingPref',
      name: 'LoadingPref',
    });

  }

  checker() {
    if (this.state.origin == "" || this.state.destination == "" || (this.state.origin == this.state.destination)) {
      Alert.alert(
        'Invalid Origin or Destination',
        'Please re-enter the routing pair.',
        [
          { text: 'OK' }
        ]
      )
    } /*else if (this.state.origin.indexOf('Ankara') == -1 || this.state.destination.indexOf('Ankara') == -1) {
      Alert.alert(
        'Our service is restricted to Ankara City.',
        'Update about other cities will be in next version.',
        [
          { text: 'OK' }
        ]
      )
    } */else {
      this.goToNext();
    }


  }
  goToOrigin() {
    this.props.navigator.push({
      id: 'Origin',
      name: 'Origin',
    });
  }
  goToDestination() {
    this.props.navigator.push({
      id: 'Destination',
      name: 'Destination',
    });
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 50, backgroundColor: "white" }}>
        <Image style={styles.thumb} source={require('./Icon.png') }/>
        <View style = {{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.goToOrigin() }>
            <Text style={styles.buttonText}>{this.state.origin}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.goToDestination() }>
            <Text style={styles.buttonText}>{this.state.destination}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.checker() }>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  thumb: {
    alignSelf: 'center',
    marginTop: 50,
    width: 300, height: 200
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  flexItemContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
  },
  flexTextStyle: {
    fontFamily: 'Tahoma',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
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
  rowContainer: {
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  taxi: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  image: {
    width: 80,
    height: 60
  },
  input: {
    height: 54,
    borderColor: 'white',
    color: '#3e0f2f',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,

  },
  button: {
    borderColor: '#4099FF',
    borderWidth: 1,
    width: 250,
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#3EBAD2',
  },
  button1: {
    borderColor: '#4099FF',
    borderWidth: 1,
    marginTop: 10,
    width: 310,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#3EBAD2',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
  },
});

module.exports = RouteSelection;
