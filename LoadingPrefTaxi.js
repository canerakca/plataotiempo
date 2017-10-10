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


class LoadingPrefTaxi extends Component {

    constructor(props) {
        super(props);
        this.fetchDef = this.fetchDef.bind(this);
        this.fetchApi = this.fetchApi.bind(this);
        this.fetchTrans = this.fetchTrans.bind(this);
        this.fetchTaxi = this.fetchTaxi.bind(this);
        this.moneyCalc = this.moneyCalc.bind(this);
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
          comingMoney: 0,
          comingMax: 0,
          comingMin: 0,
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

        AsyncStorage.getItem('sendingMoney').then((value) => {
            this.state.comingMoney = parseInt(value, 10);
        });
        AsyncStorage.getItem('sendingMoneyMin').then((value) => {
            console.log("%%%%%%%%%% MIN PARA: " + value);
            this.state.comingMin = parseInt(value, 10);
        });
        AsyncStorage.getItem('sendingMoneyMax').then((value) => {
            console.log("%%%%%%%%%%% MAX PARA: " + value);
            this.state.comingMax = parseInt(value, 10);
        });

        setTimeout(this.fetchDef, 50);
        setTimeout(this.fetchTrans, 50);
        setTimeout(this.moneyCalc, 50);
        setTimeout(this.fetchTaxi, 3500);
        setTimeout(this.fetchApi, 3500);

    }

    moneyCalc(){
      this.state.money = (((this.state.comingMax-this.state.comingMin)/50*(this.state.comingMoney))+this.state.comingMin);
      console.log("%%%%%%%%%% GELEN PARA: " + this.state.money);
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
              }
              else{
                types[j][i] = "SUBWAY";
              }
              transitCount = transitCount + 1;
              html[j][i] = responseData.routes[j].legs[0].steps[i].html_instructions;
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

      this.setState({showLoading: false})
    }

    fetchTaxi(){
      var responseData = this.state.def_data;
      var responseData2 = this.state.trans_data;
      var money = this.state.money;
      var walkingList = [];
      var durationList = [];
      var transitCountList = [];
      var html = [];
      var types = [];           //yeni
      var indexMinWalking = 0;
      var indexMinDuration = 0;
      var minCostHtml = [];
      var typesForMinCost = []; // yeni
      var indexMinCost = 0;
      var costList = [];

      var moneyBarMin = 0;
      var moneyBarMax = 0;

      var moneyIndex = (((responseData2.routes[0].legs[0].distance.value) / 1000) * 2.7) + 3.;
      var maxEfficiency = 10000000000;
      var maxEfficiency2 = 10000000000;
      var index = 0;

      moneyBarMax = (((responseData2.routes[0].legs[0].distance.value) / 1000) * 2.7) + 3.1;
      for(i = 0; i < responseData2.routes.length; i++){

        var moneyIndexTemp = (((responseData2.routes[i].legs[0].distance.value) / 1000) * 2.7) + 3.1;
        if(maxEfficiency > responseData2.routes[i].legs[0].duration.value){
               maxEfficiency = responseData2.routes[i].legs[0].duration.value;
               moneyBarMax = moneyIndexTemp;
        }

         console.log("" + i + " icin " + moneyIndexTemp + " TL ve " + ((responseData2.routes[i].legs[0].duration.value) / 60) + " dk");
         console.log(" - ");
         if(maxEfficiency2 > responseData2.routes[i].legs[0].duration.value && money > moneyIndexTemp ){
           console.log(responseData2.routes[i].legs[0].duration.value);
             maxEfficiency2 = responseData2.routes[i].legs[0].duration.value;

             moneyIndex = moneyIndexTemp;
             index = i;
         }
      }
      console.log("%%%%%%%%%% INDEX PARA: " + moneyIndex);
      console.log("%%%%%%%%%% ALINAN PARA: " + money);
      console.log("%%%%%%%%%% MAX PARAaaaaaaaaaa: " + moneyBarMax);
      if(moneyIndex < money){
        html[0] = [];
        html[0][0] = "Take a taxi from " + responseData2.routes[0].legs[0].start_address + " to " + responseData2.routes[0].legs[0].end_address + ".";
        types[0] = [];                // yeni
        types[0][0] = "TAXI";         // yeni
        walkingList[0] = 0;
        indexMinWalking = 0;


        console.log(html[0][0]);
        console.log(types[0][0]);     //yeni ama gerek yok

        console.log("-");
        fullTaxiDuration = responseData2.routes[index].legs[0].duration.value;
        durationList[0] = fullTaxiDuration;
        indexMinDuration = 0;
        costList[0] = moneyBarMax;
        indexMinCost = 0;
        console.log(fullTaxiDuration);
        console.log("Full Taxi ile gidilmiş ise " + (fullTaxiDuration / 60) + " dk " + index + " ile" );
        console.log("Cheapest fix");

        if(responseData.status != "ZERO_RESULTS"){
          for(i = 0; i < responseData.routes.length; i++){
            var transitCountDefault = 0;
            for(j = 0; j < responseData.routes[i].legs[0].steps.length; j++){
                if(responseData.routes[i].legs[0].steps[j].travel_mode == "TRANSIT"){
                  transitCountDefault = transitCountDefault + 1;
                }
            }
            transitCountList[i] = transitCountDefault;
          }

          var minCostOne = transitCountList[0];
          for(k = 0; k < responseData.routes.length; k++){
              if(minCostOne > transitCountList[k]){
                minCostOne = transitCountList[k];
                indexMinCost = k;
              }
          }
          for(k = 0; k < responseData.routes[indexMinCost].legs[0].steps.length; k++){
              minCostHtml[k] = responseData.routes[indexMinCost].legs[0].steps[k].html_instructions;
              console.log(minCostHtml[k]);
              console.log("-");
          }

          moneyBarMin = (2.5 + (minCostOne - 1));
          console.log(moneyBarMin);
          console.log (moneyBarMax);
      } else {
        console.log("NO TRANSIT OPTION");
      }
    } else {

      if(responseData.status != "ZERO_RESULTS"){
        console.log("***** OPTIONS *****");
        for(j = 0; j < responseData.routes.length; j++){
            types[j] = [];                                //yeni ///////////////////////////////////////////////
            var steps = [];
            var transitCount = 0;
            var walkingDistance = 0;
            html[j] = [];

            for(i = 0; i < responseData.routes[j].legs[0].steps.length; i++){
              steps[i] = responseData.routes[j].legs[0].steps[i];
              if(steps[i].travel_mode == "TRANSIT"){
                transitCount = transitCount + 1;
              }
              else{
                walkingDistance = walkingDistance + steps[i].distance.value;
              }
            }

            transitCountList[j] = transitCount;

            var maxDistance = 0;
            var maxOne = steps[0]; //for steps
            var taxiBus = 0.4;
            var taxiWalking = 0.025;


            console.log("OPTION " + (j + 1) + " is shown below: ");

            for(i = 0; i < steps.length; i++){
                if(steps[i].duration.value > maxDistance){
                    if(transitCount <= 1){
                      if(steps[i].travel_mode == "TRANSIT"){
                        var roadCost = ((steps[i].distance.value / 1000) * 2.7) + 3.1;
                        if(roadCost <= money){
                          maxDistance = steps[i].duration.value;
                          maxOne = steps[i];
                          costList[j] = roadCost;
                        }
                      }
                      else{
                        var roadCost = ((steps[i].distance.value / 1000) * 2.7) + 3.1 + 2.5;
                        if(roadCost <= money){
                          maxDistance = steps[i].duration.value;
                          maxOne = steps[i];
                          costList[j] = roadCost;
                        }
                      }
                    }
                    else{
                      if(steps[i].travel_mode == "TRANSIT"){
                        var roadCost = ((steps[i].distance.value / 1000) * 2.7) + 3.1 + 2.5 + (transitCount - 1);
                        if(roadCost <= money){
                          maxDistance = steps[i].duration.value;
                          maxOne = steps[i];
                          costList[j] = roadCost;
                        }
                      }
                      else{
                        var roadCost = ((steps[i].distance.value / 1000) * 2.7) + 3.1 + 2.5 + (transitCount);
                        if(roadCost <= money){
                          maxDistance = steps[i].duration.value;
                          maxOne = steps[i];
                          costList[j] = roadCost;
                        }
                      }
                    }
                }
            }
            if(maxDistance != 0 && maxOne.travel_mode == "WALKING"){
              walkingDistance = walkingDistance - maxOne.distance.value;
            }

            walkingList[j] = walkingDistance;

            console.log("***************************************************");
            console.log("Toplam yürüme mesafesi " + walkingList[j] + " metre");
            console.log("***************************************************");

            var actualDuration = 0;
            var fullTaxiDuration = 0;
            if(maxDistance == 0){
                actualDuration = responseData.routes[j].legs[0].duration.value;
                durationList[j] = actualDuration;
                costList[j] = 2.5 + (transitCountList[j] - 1)                                    // yeni//////////////////////////
                for(i = 0; i < steps.length; i++){
                  //////////////////////////////////////////////////////////////////////////////////////////
                  //bu for un içi komple bununla replace olacak
                  if(responseData.routes[j].legs[0].steps[i].travel_mode == "WALKING"){
                    types[j][i] = "WALKING";
                    html[j][i] = steps[i].html_instructions;
                  }
                  else{
                      if(responseData.routes[j].legs[0].steps[i].transit_details.line.vehicle.type == "BUS"){
                          types[j][i] = "BUS";
                          html[j][i] = "Take the bus ("+ responseData.routes[j].legs[0].steps[i].transit_details.line.short_name +") from "
                          + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                      }
                      else{
                          types[j][i] = "SUBWAY";
                          html[j][i] = "Take the subway from "
                          + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                      }
                  }
                  console.log(steps[i].html_instructions);
                  console.log("-");
                }
                ///////////////////////////////////////////////////////////////////////////////////////
                console.log("legden alsak " + (actualDuration) / 60 + " dk");
            }
            else{
              for(i = 0; i < steps.length; i++){
                if(maxOne.duration.value != steps[i].duration.value){
                  /////////////////////////////////////////////////////////////////////////////
                  //bu if in içi komple bununla replace olacak
                  if(responseData.routes[j].legs[0].steps[i].travel_mode == "WALKING"){
                    types[j][i] = "WALKING";
                    html[j][i] = responseData.routes[j].legs[0].steps[i].html_instructions;
                  }
                  else{
                      if(responseData.routes[j].legs[0].steps[i].transit_details.line.vehicle.type == "BUS"){
                          types[j][i] = "BUS";
                          html[j][i] = "Take the bus ("+ responseData.routes[j].legs[0].steps[i].transit_details.line.short_name +") from "
                        + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                      }
                      else{
                          types[j][i] = "SUBWAY";
                          html[j][i] = "Take the subway from "
                         + responseData.routes[j].legs[0].steps[i].transit_details.departure_stop.name + " to " + responseData.routes[j].legs[0].steps[i].transit_details.arrival_stop.name + ".";
                      }
                  }
                  actualDuration = actualDuration + steps[i].duration.value;
                  console.log(steps[i].html_instructions);
                  console.log("-");
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////////////

                else{
                  types[j][i] = "TAXI";                       // yeni////////////////////////////////////
                  if(steps[i].travel_mode == "TRANSIT"){
                    actualDuration = actualDuration + steps[i].duration.value;
                    html[j][i] = "Take a taxi from " + steps[i].transit_details.departure_stop.name + " to " + steps[i].transit_details.arrival_stop.name + ".";
                    console.log(html[j][i]);
                    console.log("-");
                  }
                  else{
                    if(i == 0){
                        actualDuration = actualDuration + steps[i].duration.value;
                        html[j][i] = "Take a taxi from " + responseData.routes[j].legs[0].start_address + " to " + steps[i + 1].transit_details.departure_stop.name + ".";
                        console.log(html[j][i]);
                        console.log("-");
                    }
                    else if (i > 0 && i < steps.length - 1){
                        actualDuration = actualDuration + steps[i].duration.value;
                        html[j][i] = "Take a taxi from " + steps[i - 1].transit_details.arrival_stop.name + " to " + steps[i + 1].transit_details.departure_stop.name + ".";
                        console.log(html[j][i]);
                        console.log("-");
                    }
                    else{
                        actualDuration = actualDuration + steps[i].duration.value;
                        html[j][i] = "Take a taxi from " + steps[i - 1].transit_details.arrival_stop.name + " to " + responseData.routes[j].legs[0].end_address + ".";
                        console.log(html[j][i]);
                        console.log("-");
                    }
                  }
                }
              }
              var duration = 0;
              if(maxOne.travel_mode == "TRANSIT"){
                if(transitCount <= 1){
                  duration =  (actualDuration) - (maxOne.duration.value) + (taxiBus * maxOne.duration.value);
                }
                else{
                  var deadDuration = 0;
                  deadDuration = (responseData.routes[j].legs[0].duration.value) - (actualDuration);
                  deadDuration = deadDuration / transitCount;
                  duration = (responseData.routes[j].legs[0].duration.value) - deadDuration - ((maxOne.duration.value) * (1 - taxiBus));
                }
              }
              else {
                duration =  (responseData.routes[j].legs[0].duration.value) - (maxOne.duration.value) + (taxiWalking * (maxOne.duration.value));
              }

              durationList[j] = duration;
              console.log(responseData);
              console.log("legden alsak " + (responseData.routes[j].legs[0].duration.value) / 60 + " dk");
              console.log("Taxi girmiş ise " + (duration / 60) + " dk");
              console.log("-----------------------------------------------------------------------------");
              console.log("-----------------------------------------------------------------------------");
            }
        }
        var minWalkingOne = walkingList[0];
        for(k = 0; k < responseData.routes.length; k++){
            if(minWalkingOne > walkingList[k]){
                minWalkingOne = walkingList[k];
                indexMinWalking = k;
            }
        }
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(costList[indexMinWalking]);
        console.log("The option with the minimum walking distance is Option " + (indexMinWalking + 1) + " (" + minWalkingOne + " m) ");
        console.log("-");
        for(k = 0; k < html[indexMinWalking].length; k++){
            console.log(html[indexMinWalking][k]);
            console.log(types[indexMinWalking][k]);
        }

        var minDurationOne = durationList[0];
        for(k = 0; k < responseData.routes.length; k++){
            if(minDurationOne > durationList[k]){
                minDurationOne = durationList[k];
                indexMinDuration = k;
            }
        }
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(costList[indexMinDuration]);
        console.log("The option with the minimum duration is Option " + (indexMinDuration + 1) + " (" + (minDurationOne) / 60 + " min) ");
        console.log("-");
        for(k = 0; k < html[indexMinDuration].length; k++){
            console.log(html[indexMinDuration][k]);
            console.log(types[indexMinDuration][k]);
        }

        var minCostOne = transitCountList[0];
        for(k = 0; k < responseData.routes.length; k++){
            if(minCostOne > transitCountList[k]){
                minCostOne = transitCountList[k];
                indexMinCost = k;
            }
        }
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(costList[indexMinCost]);
        console.log("The option with the minimum cost is Option " + (indexMinCost + 1) + " (" + (2.5 + (minCostOne - 1)) + " TL) ");
        moneyBarMin = (2.5 + (minCostOne - 1));
        console.log("-");

        for(k = 0; k < responseData.routes[indexMinCost].legs[0].steps.length; k++){
            minCostHtml[k] = responseData.routes[indexMinCost].legs[0].steps[k].html_instructions;
            console.log(minCostHtml[k]);

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // ARAYA BU KISIM GİRECEK
            if(responseData.routes[indexMinCost].legs[0].steps[k].travel_mode == "WALKING"){
                typesForMinCost[k] =  "WALKING";
            }
            else{
                 if(responseData.routes[indexMinCost].legs[0].steps[k].transit_details.line.vehicle.type == "BUS"){
                          typesForMinCost[k] = "BUS";
                  }
                  else{
                         typesForMinCost[k] = "SUBWAY";
                  }
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            console.log(typesForMinCost[k]);
        }

        console.log(moneyBarMin);
        console.log(moneyBarMax);
    }else{
          console.log("INCREASE THE MONEY FOR TAXI --- NO TRANSIT OPTIONS ARE PROVIDED RIGHT NOW");
        }
  }

      this.state.transitCountList2 = transitCountList;
      this.state.walkingList2 = walkingList;
      this.state.durationList2 = durationList;
      this.state.indexMinCost2 = indexMinCost;
      this.state.indexMinWalking2 = indexMinWalking;
      this.state.indexMinDuration2 = indexMinDuration;
      this.state.html2 = html;
      this.state.types2 = types;
      this.state.moneyBarMin2 = moneyBarMin;
      this.state.moneyBarMax2 = moneyBarMax;
      this.state.minCostHtml = minCostHtml;
      this.state.typesForMinCost = typesForMinCost;


      this.state.costList = costList;

      // Min Walk & Fastest Data and Types
      AsyncStorage.setItem('html', JSON.stringify(this.state.html2));
      AsyncStorage.setItem('types', JSON.stringify(this.state.types2));
      AsyncStorage.setItem('costList', JSON.stringify(this.state.costList));
      AsyncStorage.setItem('durationList', JSON.stringify(this.state.durationList2));
      AsyncStorage.setItem('walkingList', JSON.stringify(this.state.walkingList2));

      // Index
      AsyncStorage.setItem('minWalkInd', this.state.indexMinWalking2.toString());
      AsyncStorage.setItem('fastestInd', this.state.indexMinDuration2.toString());
      AsyncStorage.setItem('cheapestInd', this.state.indexMinCost2.toString());

      // Cheapest
      AsyncStorage.setItem('cheapestHtml', JSON.stringify(this.state.minCostHtml));



      this.props.navigator.push({
        id: 'UserPref',
        name: 'UserPref',
      });
      this.setState({showLoading: false})
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

module.exports = LoadingPrefTaxi;
