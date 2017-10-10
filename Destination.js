
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native';



var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: "",
            destination: "",
        };
    }


    goToNext() {
        this.props.navigator.push({
            id: 'RouteSelection',
            name: 'RouteSelection',
        });
    }

   render() {
    return (
        <View style={styles.origin}>
         <GooglePlacesAutocomplete
          placeholder='Destination'
          minLength={2}
          autoFocus={true}
          listViewDisplayed='true'
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
          AsyncStorage.setItem('destination', data.description);
          this.state.destination = data.description;
          this.goToNext();
          } }
          getDefaultValue={() => {
            return '';
          } }
          query={{

            key: 'AIzaSyAer_0gG853VTFKGYZhnXJ1Dpdg5RiG6wQ',
            language: 'en',
            components: 'country:tr',
            region: '(locality)',
            default: 'address',

          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}

          currentLocation={false}
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch'

          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          />
          </View>
    );
  }
}

const styles = StyleSheet.create({

  origin: {
    flex: 1,

    backgroundColor: '#F5FCFF',
    marginTop: 55,
    flexDirection: 'row',
  },
});



module.exports = Destination;
