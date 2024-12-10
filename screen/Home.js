import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function App({navagation, route}) {

  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const user  = route.params.userData;

  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
       axios.get('https://671d0c3909103098807c1347.mockapi.io/category').then((response) => {
        setCategory(response.data);
       });
       axios.get('https://671d0c3909103098807c1347.mockapi.io/location').then((response) => {
        setLocation(response.data);
       });
    }, []);
  const numColumns = 4;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logoicon.png')}/>
        <View style={styles.input}>
          <TextInput placeholder="search here ..." placeholderTextColor='black' />
          <Image style={{height: 30, width: 30}} source={require('../assets/findicon.png')}/>
        </View>
      </View>

      <View style={styles.nav}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{height: 50, width: 50, borderRadius: 90}} 
          source={{uri : user.img}}/>
          <View style={{marginLeft: 15}}>
            <Text style={{ color: 'white'}}>Welcome!</Text>
            <Text style={{ color: 'white'}}>{user.name}</Text>
          </View>
        </View>
        <Image source={require('../assets/ringicon.png')}/>
      </View>

      <View style={[styles.nav1, {paddingTop: 20}]}>
        <Text style={{ color: 'black'}}>Category</Text>
        <Image style={{height: 30, width: 30}} source={require('../assets/3gach.png')}/>
      </View>

      <FlatList
          data={category}
          renderItem={({ item }) => (
          <TouchableOpacity style={[styles.categoryItem, {width: screenWidth / numColumns }]}>
            <View style={styles.categoryIconContainer}>
              <Image source={{ uri: item.image }} style={styles.categoryIcon}/>
            </View>
              <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
          )}
          numColumns={numColumns}
      />

      <View style={[styles.nav1, {marginTop: 10}]}>
        <Text style={{ color: 'black'}}>Popular Destination</Text>
        <Image style={{height: 30, width: 30}} source={require('../assets/3gach.png')}/>
      </View>

       <FlatList
          data={location.slice(0, 3)}
          renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{}}>
              <Image source={{ uri: item.image }} style={styles.locationImage}/>
            </View>
          </TouchableOpacity>
          )}
          numColumns={numColumns}
      />

       <View style={[styles.nav1, {marginTop: 20}]}>
        <Text style={{ color: 'black'}}>Recomended</Text>
        <Image style={{height: 30, width: 30}} source={require('../assets/3gach.png')}/>
      </View>

       <FlatList
          data={location.slice(3, 5)}
          renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{ uri: item.image }} style={styles.locationImage2}/>
            </View>
          </TouchableOpacity>
          )}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          numColumns={numColumns}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, header : {
    backgroundColor: '#5958b2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25
  }, input : {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginLeft: 10,
    borderRadius: 15
  }, nav :{
      backgroundColor: '#5958b2',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingHorizontal: 15,
      marginTop: -15,
      paddingBottom: 20
  }, nav1 :{
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingHorizontal: 25,
      marginTop: -15,
      paddingBottom: 10
  }, categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
  }, categoryIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'center',
    },  categoryIcon:{
        width: 64,
        height: 64,
    }, categoryText:{
        marginTop: 8,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    }, locationImage:{
        width: 110,
        height: 110,
        margin: 10,
        borderRadius: 10,
    },locationImage2:{
        width: 130,
        height: 130,
        margin: 10,
        borderRadius: 10,
    }, bottomNav:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#5958b2',
        padding: 25,
    },
    navItem:{
        alignItems: 'center',
    },
    navLabel:{
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
    },
    navicon:{
        width: 40,
        height: 40,
    },
});
