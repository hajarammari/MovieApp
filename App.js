import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Button,
  View,
  TextInput,
  Dimensions,
  ImageBackground,
  StatusBar
} from 'react-native';
import GridView from './components/GridView';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Récupérer les films poopulaires
const URL_API =
  'https://api.themoviedb.org/3/movie/popular?api_key=0b1a688741b00bb5903065f5a3eca7fb';
//Récupérer les images
const IMG_URL = 'https://image.tmdb.org/t/p/w300';
//Rechercher un film
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=0b1a688741b00bb5903065f5a3eca7fb&query=';

const api = axios.create({
  baseURL: URL_API,
});

const api_search = axios.create({
  baseURL: SEARCH_URL,
});

const App = () => {
  //Récupérer la liste des films et on initialise avec une liste vide
  const [films, setFilms] = useState([]); //const [current state, function to update the current state] = useState('default value')
  const [numPage, setNumPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [background, setBackground] = useState(null);

  /*
  The useEffect hook is an essential hook in React and React Native
  that allows you to perform side effects in your functional components.
  Side effects refer to any actions or operations that occur outside the
  scope of the component's render process, such as fetching data from an API,
  subscribing to event listeners, manipulating the DOM, or setting up timers.
  */

  useEffect(() => {
    //Fct qui récupère les films depuis l'API
    const getFilms = async () => {
        try {
          const response = await api.get('', {
            params: {
              page: numPage,
            },
          });
          setFilms(response.data.results);
          if (response.data.results.length > 0) {
            setBackground(response.data.results[0]);
          }
        } catch (error) {
          console.log(error);
        }
    };

    //La méthode getFilms sera éxécuter au lancement de l'application
    if (keyword === '') {
      getFilms();
    }
  }, [films, numPage]);

  //RECHERCHE
  const rechercher = async motCle => {
    api_search.get(motCle).then(rep => setFilms(rep.data.results));
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={{flexDirection: 'row', padding: 10}}>
      <View style={styles.SearchboxContainer}>
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor="#666"
          style={styles.Searchbox}
          onChangeText={value => setKeyword(value)}></TextInput>
        <Feather
          name="search"
          size={22}
          color='#666'
          style={styles.SearchboxIcon}
          onPress={() => {
            rechercher(keyword);
          }}/>
        </View>
      </View>
      <FlatList
        //The FlatList component is provided with the data prop set to the DATA array.
        data={films}
        // The renderItem prop defines how each item in the data array should be rendered.
        // In this case, it uses the GridView component and passes the title prop from each item to it.
        renderItem={({item}) => (
          <GridView
            title={item.title}
            pic={IMG_URL + item.poster_path}
            date={item.release_date}
            overview={item.overview}
          />
        )}
        numColumns={2}
        //The keyExtractor prop is used to specify a unique key for each item in the data array.
        //In this case, it uses the id property of each item as the key.
        keyExtractor={item => item.id}
      />
      {/* Boutons */}
      <View style={{flexDirection: 'row', marginRight: 10}}>
        <View style={{width: '45%', height: 50, margin: 10}}>
          <MaterialIcons
          name="navigate-before"
          size={22}
          color='#841584'
          style={{position: 'absolute',left:20, top:14}}
          onPress={() => {
            setNumPage(numPage - 1);
          }}/>
        </View>
        <View style={{width: '45%', height: 50, margin: 10, }}>
        <MaterialIcons
          name="navigate-next"
          size={22}
          color='#841584'
          style={styles.SearchboxIcon}
          onPress={() => {
            setNumPage(numPage + 1);
          }}/>
         
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  SearchboxContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  SearchboxIcon: {
    position: 'absolute',
    right: 20,
    top: 14
  },
});

export default App;