import React, {Component} from 'react';
//import {View,Text, TouchableOpacity} from 'react-native';
import {firebaseApp} from '../components/firebaseconfig';

export default class ReadtimeDB extends Component{
    constructor(props){
        super(props);
        this.itemRef=firebaseApp.database.ref('Location');
    }
    // setDB(){
    //     this.itemRef.set({
    //         "lat": 10.848762,
    //         "long": 106.775653,
    //         "title": "ATM Techcombank"
    //     });
    // }

    // pushDB(){
    //     this.itemRef.pushDB(){
    //         this.itemRef.ref('Location').push({
    //             "lat": 10.848762,
    //             "long": 106.775653,
    //             "title": "ATM Techcombank1"
    //         })
    //     }
    // }
    addDB(){
        this.itemRef.ref('Location').on('value', function(snapghost){
            alert(snapghost.val())           
        });
    }
    // render(){
    //     return(
    //         <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
    //         <TouchableOpacity onPress={()=>{this.setDB()}}>
    //             <Text>
    //                 set DB
    //             </Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity onPress={()=>{this.pushDB()}}>
    //             <Text>
    //                 push DB
    //             </Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity onPress={()=>{this.addDB()}}>
    //             <Text>
    //                 add DB
    //             </Text>
    //         </TouchableOpacity>
    //         </View>
    //     );
    // }
}