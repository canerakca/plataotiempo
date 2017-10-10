/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default class plato extends Component {
  constructor(props) {
      super(props);
      this.helper = this.helper.bind(this);
      this.state = {
        array: [],
        ind: 0,
      };

      AsyncStorage.getItem('arrayD').then((value) => {
          value = JSON.parse(value);
          var c = [];
          this.setState({ array: value });
      });

      AsyncStorage.getItem('walkD').then((value) => {
          this.setState({ ind: value });
      });
      setTimeout(this.helper, 50);
  }
  helper(){
    var arr = [];
    for(i = 0; i < this.state.array[this.state.ind].length; i++){
      arr[i] = this.state.array[this.state.ind][i];
    }
    this.setState({ array: arr });
  }

  render() {

    var print = [];

  	for(let i = 0; i < this.state.array.length; i++){

  		print.push(
  			<View key = {i}>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={require('./bus.png')}/>
            <View  style={styles.textContainer}>
              <Text style={styles.title}>
                {this.state.array[i]}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
  			</View>
  		)
  	}

    return (

      <ScrollView contentContainerStyle ={{flexDirection: 'column', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'flex-start', backgroundColor: 'white'}}>

      <View>
          {print}
      </View>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  flexItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

AppRegistry.registerComponent('plato', () => plato);
