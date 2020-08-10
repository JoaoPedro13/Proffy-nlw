import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import styles from './styles';

const GiveClasses = () => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImg}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar , registe-se como professor no nosso website
        </Text>
      </ImageBackground>
      <RectButton style={styles.okButton} onPress={goBack}>
        <Text style={styles.okButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
