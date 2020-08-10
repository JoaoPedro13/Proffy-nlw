import React, {useState} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import heartOutlineIcon from '../../assets/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/icons/unfavorite.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';
import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  name: string;
  subject: string;
  cost: number;
  whatsapp: string;
}
interface TeacherListProps {
  teacher: Teacher;
  favorite: boolean;
}

const TeacherItem: React.FC<TeacherListProps> = ({teacher, favorite}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleLinkToWhatsapp = () => {
    api.post('connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  };

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorite) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem: Teacher) => {
          return teacherItem.id === teacher.id;
        }
      );
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorite(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorite(true);
    }
    await AsyncStorage.setItem(
      'favorites',
      JSON.stringify(favoritesArray)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{uri: teacher.avatar}} />
        <View>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora{'  '}
          <Text style={styles.priceValue}>{teacher.cost} €</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorite ? styles.added : {}]}
            onPress={handleToggleFavorite}
          >
            {!isFavorite ? (
              <Image source={heartOutlineIcon} />
            ) : (
              <Image source={unfavoriteIcon} />
            )}
          </RectButton>
          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text
              style={styles.contactButtonText}
              onPress={handleLinkToWhatsapp}
            >
              Entrar em contacto
            </Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
