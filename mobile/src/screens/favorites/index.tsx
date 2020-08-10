import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/header';
import TeacherItem, {Teacher} from '../../components/teacher-item';
import styles from './styles';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then((res) => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);

        setFavorites(favoriteTeachers);
      }
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <Header title="Os meus Proffys favoritos" />
      <ScrollView
        style={styles.teachersList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} favorite />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
