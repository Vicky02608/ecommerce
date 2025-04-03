import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NAVIGATION } from '../../utils/constants';
import { useAppTheme } from '../../storage/context/ThemeContext';

interface Props {
  navigation: NavigationProp<any>;
}

const IntroductionScreen = ({ navigation }: Props) => {
  const { themeProperties, theme } = useAppTheme();

  return (
    <View style={[styles.container, {
      backgroundColor:
        theme === "light" ? "#ffffff" : "#808080"
    }]}>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1571699821723-7265429b0d35' }} style={styles.image} />
      <Text style={[styles.title, { color: themeProperties.textColor },]}>Welcome to Our App</Text>
      <Text style={[styles.subtitle, { color: themeProperties.textColor },]}>Edit your Description here</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(NAVIGATION.LOGIN)}>
        <Text style={[styles.buttonText,]}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
