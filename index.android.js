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
  Navigator,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Cheapest from './CheapestResult';
import MinWalk from './MinWalkResult';
import Fastest from './FastestResult';
import RouteSelection from './RouteSelection';
import UserPref from './UserPref';
import LoadingPref from './LoadingPref';
import LoadingPrefTaxi from './LoadingPrefTaxi';
import Origin from './Origin';
import Destination from './Destination';
import DirectTaxi from './DirectTaxi';

  export default class plataotiempo extends Component {

     constructor(props){
      super(props);
      var origin = "Select Origin";
      var destination = "Select Destination";
      AsyncStorage.setItem('origin', origin.toString());
      AsyncStorage.setItem('destination', destination.toString());
    };

    renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'RouteSelection') {
      return (
        <RouteSelection
          navigator={navigator} />
      );
    }
    if (routeId === 'LoadingPrefTaxi') {
      return (
        <LoadingPrefTaxi
          navigator={navigator} />
      );
    }
    if (routeId === 'DirectTaxi') {
      return (
        <DirectTaxi
          navigator={navigator} />
      );
    }
    if (routeId === 'LoadingPref') {
      return (
        <LoadingPref
          navigator={navigator}/>
      );
    }
    if (routeId === 'UserPref') {
      return (
        <UserPref
          navigator={navigator}/>
      );
    }
    if (routeId === 'MinWalkResult') {
      return (
        <MinWalk
          navigator={navigator} />
      );
    }
    if (routeId === 'FastestResult') {
      return (
        <Fastest
          navigator={navigator} />
      );
    }
    if (routeId === 'CheapestResult') {
      return (
        <Cheapest
          navigator={navigator} />
      );
    }
    if (routeId === 'Origin') {
      return (
        <Origin
          navigator={navigator} />
      );
    }
    if (routeId === 'Destination') {
      return (
        <Destination
          navigator={navigator} />
      );
    }
    return this.noRoute(navigator);
  }
  noRoute(navigator) {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigator.pop() }>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>error</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Navigator
        ref={"nav"}
        initialRoute={{ id: 'RouteSelection', name: 'List' }}
        style={{ flex: 1 }}
        renderScene={this.renderScene.bind(this) }
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        } }
        navigationBar={
          <Navigator.NavigationBar style={{ backgroundColor: '#3EBAD2', alignItems: 'center'}}
            routeMapper={NavigationBarRouteMapper} />
        }
        />
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {

    if (route.id === 'RouteSelection') {
      return (
        null
      );
    }
    if (route.id === 'LoadingPref') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => { navigator.pop() } }>
        </TouchableOpacity>
      );
    }
    if (route.id === 'LoadingPrefTaxi') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => { navigator.pop() } }>
        </TouchableOpacity>
      );
    }
    if (route.id === 'UserPref') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'RouteSelection',
              name: 'RouteSelection',
              sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
            });
          } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
             Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'DirectTaxi') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'RouteSelection',
              name: 'RouteSelection',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
             Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'FastestResult') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
         onPress={() => { navigator.pop() } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
            Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'CheapestResult') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
         onPress={() => { navigator.pop() } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
            Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'MinWalkResult') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
         onPress={() => { navigator.pop() } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
            Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'Origin') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'RouteSelection',
              name: 'RouteSelection',
              sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
            });
          } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
             Back
          </Text>
        </TouchableOpacity>
      );
    }
    if (route.id === 'Destination') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'RouteSelection',
              name: 'RouteSelection',
              sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
            });
          } }>
          <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>
             Back
          </Text>
        </TouchableOpacity>
      );
    }
  },
  RightButton(route, navigator, index, navState) {

    if (route.id === 'RouteSelection') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'LoadingPref',
              name: 'LoadingPref',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          } }>
        </TouchableOpacity>
      );
    }
    if (route.id === 'LoadingPref') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'UserPref',
              name: 'UserPref',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          } }>
        </TouchableOpacity>
      );
    }
    if (route.id === 'LoadingPrefTaxi') {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            navigator.push({
              id: 'UserPref',
              name: 'UserPref',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          } }>
        </TouchableOpacity>
      );
    }
    if (route.id === 'CheapestResult') {
      return (
        null
      );
    }
    if (route.id === 'DirectTaxi') {
      return (
        null
      );
    }
    if (route.id === 'MinWalkResult') {
      return (
        null
      );
    }
    if (route.id === 'FastestResult') {
      return (
        null
      );
    }
    if (route.id === 'UserPref') {
      return (
        null
      );
    }
    if (route.id === 'Origin') {
      return (
        null
      );
    }
    if (route.id === 'Destination') {
      return (
        null
      );
    }
  },
  Title(route, navigator, index, navState) {
    if (route.id === 'UserPref') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Route Results
        </Text>
      );
    }
    if (route.id === 'LoadingPref') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Plata-o-Tiempo
        </Text>
      );
    }
    if (route.id === 'DirectTaxi') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Direct Taxi
        </Text>
      );
    }
    if (route.id === 'LoadingPrefTaxi') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Plata-o-Tiempo
        </Text>
      );
    }
    if (route.id === 'MinWalkResult') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Minimum Walking
        </Text>
      );
    }
    if (route.id === 'FastestResult') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Fastest Path
        </Text>
      );
    }
    if (route.id === 'CheapestResult') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Cheapest Path
        </Text>
      );
    }
    if (route.id === 'RouteSelection') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12,fontFamily: 'Helvetica'}}>
              Plata-o-Tiempo
        </Text>
      );
    }
    if (route.id === 'Origin') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Origin Selection
        </Text>
      );
    }
    if (route.id === 'Destination') {
      return (
        <Text style={{ color: 'white', margin: 10, fontSize: 20, alignSelf: 'center',textAlign:'center',marginRight:90,marginTop:12}}>
              Destination Selection
        </Text>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('plataotiempo', () => plataotiempo);
