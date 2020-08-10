import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import Header from '../../components/header';
import TeacherItem, {Teacher} from '../../components/teacher-item';
import styles from './styles';

const TeacherList = () => {
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleToggleFilters = () => {
    setVisibleFilters(!visibleFilters);
  };

  const handleFiltersSubmit = async () => {
    loadFavorites();
    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setVisibleFilters(false);
    setTeachers(res.data);
  };

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then((res) => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);
        const favoriteTeachersIds = favoriteTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoriteTeachersIds);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {visibleFilters && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={setWeek_day}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </Header>
      <ScrollView
        style={styles.teachersList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorite={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
