import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Slider,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';


class LoadingPref extends Component {

    constructor(props) {
        super(props);
        this.fetchDef = this.fetchDef.bind(this);
        this.fetchApi = this.fetchApi.bind(this);
        this.fetchTrans = this.fetchTrans.bind(this);
        this.state = {
          origin: "",
          destination: "",
          showLoading: true,
          def_data: [],
          trans_data: [],
          //Default
          walkingList: [], // her bir route'un ne kadar yürüttüğü
          durationList: [], // her bir route'un ne kadar sürdüğü
          transitCountList: [], // her bir route'un ne kadar transit yaptığı
          indexMinCost: 0, // route plan içindeki en az cost'u olan index
          indexMinWalking: 0, // min walking tutan index
          indexMinDuration: 0, // min duration tutan index
          html: [], // html instructionları 2d array html[indexMinCost][j]
          moneyBarMin: 0,
          moneyBarMax: 0,
          types: [],
          //Taxi
          walkingList2: [], // her bir route'un ne kadar yürüttüğü
          durationList2: [], // her bir route'un ne kadar sürdüğü
          transitCountList2: [], // her bir route'un ne kadar transit yaptığı
          indexMinCost2: 0, // route plan içindeki en az cost'u olan index
          indexMinWalking2: 0, // min walking tutan index
          indexMinDuration2: 0, // min duration tutan index
          html2: [], // html instructionları 2d array html[indexMinCost][j]
          moneyBarMin2: 0,
          moneyBarMax2: 0,
          types2: [],
          minCostHtml: [],
          typesForMinCost: [],
          money: 0,
          cheapestType: [],
          counter: 0,
        };

        AsyncStorage.getItem('origin').then((value) => {
            this.setState({ origin: value });
            console.log(this.state.origin);
        });
        AsyncStorage.getItem('destination').then((value) => {
            this.setState({ destination: value });
            console.log(this.state.destination);
        });

        this.state.money = 100;
        setTimeout(this.fetchDef, 50);
        setTimeout(this.fetchTrans, 50);
        setTimeout(this.fetchApi, 3500);
    }

    fetchDef(){

        fetch("https://maps.googleapis.com/maps/api/directions/json?origin=" + this.state.origin + "&destination=" + this.state.destination +"&key=AIzaSyAer_0gG853VTFKGYZhnXJ1Dpdg5RiG6wQ&mode=transit&alternatives=true", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseData) => this.setState({ def_data: responseData }))
        .catch((error) => {
          Alert.alert(
            'Network Request Failed',
            'Server cannot retrieve users from server. Please chech the internet connection',
            [
              { text: 'OK' }
            ]
          )
        });
    }

    fetchTrans(){

        fetch("https://maps.googleapis.com/maps/api/directions/json?origin=" + this.state.origin + "&destination=" + this.state.destination +"&key=AIzaSyAer_0gG853VTFKGYZhnXJ1Dpdg5RiG6wQ&mode=driving&alternatives=true", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseData) => this.setState({ trans_data: responseData }))
        .catch((error) => {
          Alert.alert(
            'Network Request Failed',
            'Server cannot retrieve users from server. Please chech the internet connection',
            [
              { text: 'OK' }
            ]
          )
        });
    }

    fetchApi(){
      var responseData = this.state.def_data;
      var responseData2 = this.state.trans_data;
      var transitCountList = [];
      var walkingList = [];
      var durationList = [];
      var indexMinCost = 0;
      var indexMinWalking = 0;
      var indexMinDuration = 0;
      var html = [];
      var moneyBarMin = 0;
      var moneyBarMax = 0;
      var types = [];

      if(responseData.status != "ZERO_RESULTS"){
        for(j = 0; j < responseData.routes.length; j++){
          types[j] = []; // yeni
          html[j] = [];
          var walkingDistance = 0;
          var transitCount = 0;
          var duration = responseData.routes[j].legs[0].duration.value;
          for(i = 0; i < responseData.routes[j].legs[0].steps.length; i++){
              if(responseData.routes[j].legs[0].steps[i].travel_mode == "WALKING"){
                types[j][i] = "WALKING"; // yeni
                walkingDistance = walkingDistance + responseData.routes[j].legs[0].steps[i].distance.value;
                html[j][i] = responseData.routes[j].legs[0].steps[i].html_instructions;
              }

              //////////////////////////////////////////////////////////////
              else{ //yeni (önceki else ile komple değiştir)
                if(responseData.routes[j].legs[0].steps[i].transit_details.line.vehicle.type == "BUS"){
                  types[j][i] = "BUS";
                  html[j][i] = "Take the bus ("+ responseData.routes[j].legs[0].steps[i].transit_details.line.short_name +") from "
                  + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                  //responseData.routes[j].legs[0].steps[i].html_instructions;
                }
                else{
                  types[j][i] = "SUBWAY";
                  html[j][i] = "Take the subway from "
                  + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                }
                transitCount = transitCount + 1;
              }
              ///////////////////////////////////////////////////////////

          }
          walkingList[j] = walkingDistance;
          transitCountList[j] = transitCount;
          durationList[j] = duration;
        }

          var minCostOne = transitCountList[0];
          for(k = 0; k < responseData.routes.length; k++){
              if(minCostOne > transitCountList[k]){
                 minCostOne = transitCountList[k];
                 indexMinCost = k;
              }
          }
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
          console.log( (2.5 + (minCostOne - 1) ) + " TL");
          console.log(durationList[indexMinCost]);
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          for(k = 0; k < responseData.routes[indexMinCost].legs[0].steps.length; k++){
              console.log(html[indexMinCost][k]);
              console.log(types[indexMinCost][k]);
              console.log("-");
          }

          var minWalkingOne = walkingList[0];
          for(k = 0; k < responseData.routes.length; k++){
              if(minWalkingOne > walkingList[k]){
                 minWalkingOne = walkingList[k];
                 indexMinWalking = k;
              }
          }
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
          console.log((walkingList[indexMinWalking]) + " m");
          console.log(durationList[indexMinWalking]);
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          for(k = 0; k < responseData.routes[indexMinWalking].legs[0].steps.length; k++){
              console.log(html[indexMinWalking][k]);
              console.log(types[indexMinWalking][k]);
              console.log("-");
          }
          moneyBarMin = (2.5 + (minCostOne - 1));
          console.log(moneyBarMin);

          var minDurationOne = durationList[0];
          for(k = 0; k < responseData.routes.length; k++){
              if(minDurationOne > durationList[k]){
                 minDurationOne = durationList[k];
                 indexMinDuration = k;
              }
          }

          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
          console.log((responseData.routes[indexMinDuration].legs[0].duration.value)/60 + " dk");
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          for(k = 0; k < responseData.routes[indexMinDuration].legs[0].steps.length; k++){
              console.log(html[indexMinDuration][k]);
              console.log(types[indexMinDuration][k]);
              console.log("-");
          }
          moneyBarMin = (2.5 + (minCostOne - 1));
          console.log(moneyBarMin);

          moneyBarMax = (((responseData2.routes[0].legs[0].distance.value) / 1000) * 2.7) + 3.1;
          var maxEfficiency = 1000000;
          for(i = 0; i < responseData2.routes.length; i++){
              var moneyIndex = (((responseData2.routes[i].legs[0].distance.value) / 1000) * 2.7) + 3.1;
              console.log("Money required for Option " + i + " is " + moneyIndex + " TL with " +((responseData2.routes[i].legs[0].duration.value) / 60) + " min");
              if(maxEfficiency > responseData2.routes[i].legs[0].duration.value){
                  maxEfficiency = responseData2.routes[i].legs[0].duration.value;
                  moneyBarMax = moneyIndex;
              }
          }
          console.log("MAX is " + moneyBarMax + " TL");


        console.log(responseData);
        this.state.transitCountList = transitCountList;
        this.state.walkingList = walkingList;
        this.state.durationList = durationList;
        this.state.indexMinCost = indexMinCost;
        this.state.indexMinWalking = indexMinWalking;
        this.state.indexMinDuration = indexMinDuration;
        this.state.html = html;
        this.state.types = types;
        this.state.moneyBarMin = moneyBarMin;
        this.state.moneyBarMax = moneyBarMax;

        var costList = [];
        for(i = 0; i < transitCountList.length; i++){
            costList[i] = 2.5 + (transitCountList[i] - 1);
        }
        this.state.costList = costList;

        var cheapestInfo = [];
        cheapestInfo[0] = this.state.durationList[this.state.indexMinCost];
        cheapestInfo[1] = this.state.walkingList[this.state.indexMinCost];
        cheapestInfo[2] = this.state.costList[this.state.indexMinCost];

        this.state.cheapestInfo = cheapestInfo;

        // Min Walk & Fastest Data and Types
        AsyncStorage.setItem('html', JSON.stringify(this.state.html));
        AsyncStorage.setItem('types', JSON.stringify(this.state.types));
        AsyncStorage.setItem('costList', JSON.stringify(this.state.costList));
        AsyncStorage.setItem('cheapestInfo', JSON.stringify(this.state.cheapestInfo));

        // Index
        AsyncStorage.setItem('minWalkInd', this.state.indexMinWalking.toString());
        AsyncStorage.setItem('fastestInd', this.state.indexMinDuration.toString());
        AsyncStorage.setItem('cheapestInd', this.state.indexMinCost.toString());

        // Cheapest
        var minCostContent = [];
        for(i = 0; i < html[indexMinCost].length; i++){
            minCostContent[i] = html[indexMinCost][i];
        }
        var minCostType = [];
        for(i = 0; i < types[indexMinCost].length; i++){
            minCostType[i] = types[indexMinCost][i];
        }

        for(i = 0; i < minCostType.length; i++){
            this.state.cheapestType[i] = minCostType[i];
        }
        AsyncStorage.setItem('typesCheapest', JSON.stringify(minCostType));
        AsyncStorage.setItem('cheapestHtml', JSON.stringify(minCostContent));
        AsyncStorage.setItem('walkingList', JSON.stringify(walkingList));
        AsyncStorage.setItem('durationList', JSON.stringify(durationList));

        AsyncStorage.setItem('barMin', this.state.moneyBarMin.toString());
        AsyncStorage.setItem('barMax', this.state.moneyBarMax.toString());

        this.setState({showLoading: false})
        this.props.navigator.push({
          id: 'UserPref',
          name: 'UserPref',
        });

      } else {
        this.setState({showLoading: false})
        this.props.navigator.pop();
      }
    }

    render() {
        return (
            <View style={styles.container}>
              {
                this.state.showLoading &&
                <OrientationLoadingOverlay
                  visible={true}
                  color="white"
                  indicatorSize="large"
                  messageFontSize={24}
                  message="Calculating..."
                  />
              }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    okUndo: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    result: {
        fontSize: 20,
        margin: 10,
    },
    header: {
        textDecorationLine: 'underline',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "blue",
    },
    sliderContainer: {
        alignItems: 'center',
    },
    slider: {
        width: 300,
    },
    text: {
        color: 'red',
        fontSize: 24,
    },
    okbutton: {
        borderColor: 'black',
        borderWidth: 1,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#ffe6f3',
    },
    undobutton: {
        borderColor: 'black',
        borderWidth: 1,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#ffe6f3',
    },
    buttonText: {
        color: '#3e0f2f',
    },

});

module.exports = LoadingPref;
