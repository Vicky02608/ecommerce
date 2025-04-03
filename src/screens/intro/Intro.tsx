import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NAVIGATION, STORAGE_KEYS } from '../../utils/constants';
import { useAppTheme } from '../../storage/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../../component';

interface Props {
  navigation: NavigationProp<any>;
}

const IntroductionScreen = ({ navigation }: Props) => {
  const { themeProperties, theme } = useAppTheme();


  const [intro, setIntro] = useState<any>(null);
  const styles = getThemeStyles(theme, themeProperties);

  useEffect(() => {
    const checkIntroStatusAndSet = async () => {
      const isCheck = await checkIntroStatus();
      console.log(isCheck)
      setIntro(isCheck ? isCheck : "");
      if (isCheck == "true") {
        navigation.navigate(NAVIGATION.LOGIN)
      }
    };

    checkIntroStatusAndSet(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run only once when the component mounts

  const checkIntroStatus = async () => {
    return await AsyncStorage.getItem(NAVIGATION.INTRO);
  };

  return (
    intro == null ?
      <Loader />
      :
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/small-business-store-shop-design-restaurants-bistro-vector-flat-illustration_194708-1033.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to Our Store</Text>
        <Text style={styles.subtitle}>Discover and shop the best products.</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            AsyncStorage.setItem(STORAGE_KEYS.INTRO, "true")
            navigation.navigate(NAVIGATION.LOGIN)
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
  );
};

// Dynamic styling based on theme
const getThemeStyles = (theme: string, themeProperties: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === "light" ? "#ffffff" : "#303030",
      padding: 20,
    },
    image: {
      width: 220,
      height: 220,
      marginBottom: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: themeProperties.textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: themeProperties.textSecondaryColor || "#888",
      textAlign: 'center',
      marginBottom: 25,
    },
    button: {
      backgroundColor: themeProperties.primaryColor || '#007bff',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default IntroductionScreen;
