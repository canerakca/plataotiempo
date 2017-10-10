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

export default class CheapestResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
        array: [],
        ind: 0,
        typ: [],
      };

      AsyncStorage.getItem('cheapestHtml').then((value) => {
          value = JSON.parse(value);
          this.setState({ array: value });
      });


      AsyncStorage.getItem('cheapestInd').then((value) => {
          this.setState({ ind: value });
      });

      AsyncStorage.getItem('typesCheapest').then((value) => {
          value = JSON.parse(value);
          this.setState({ typ: value });
      });

  }

  render() {

    var print = [];
  	for(let i = 0; i < this.state.array.length; i++){
      if(this.state.typ[i] == 'WALKING'){
        print.push(
          <View key = {i}>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={require('./walking.png')}/>
              <View  style={styles.textContainer}>
                <Text style={styles.title}>
                  {this.state.array[i]}
                </Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        )
      } if (this.state.typ[i] == 'BUS'){
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
      } if (this.state.typ[i] == 'TAXI') {
        print.push(
    			<View key = {i}>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={require('./taxi.png')}/>
              <View  style={styles.textContainer}>
                <Text style={styles.title}>
                  {this.state.array[i]}
                </Text>
              </View>
            </View>
            <View style={styles.separator}/>
    			</View>
    		)
      } else {
        print.push(
    			<View key = {i}>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={require('./subway.png')}/>
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
  	}

    return (

      <ScrollView contentContainerStyle ={{flexDirection: 'column', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'flex-start', backgroundColor: 'white'}}>

      <View style={styles.flexContainer1}>
          {print}
      </View>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  flexContainer1: {
      marginTop: 56,
      flex: 1,
      backgroundColor: 'white',
      borderWidth: 1,
  },
  title: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
  },

  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginTop:15
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height:130,
  }
});


AppRegistry.registerComponent('CheapestResult', () => plato);
