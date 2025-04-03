import React, { useEffect } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider } from './src/storage/context/AuthContext';
import { AppProvider } from './src/storage/context/AppContext';
import { ThemeProvider } from './src/storage/context/ThemeContext';
import { ErrorBoundary } from 'react-error-boundary';
import i18n from './src/localization/i18n';

import { LanguageProvider } from './src/storage/context/LanguageContext';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <View style={[styles.container, {
    marginTop: StatusBar.currentHeight
  }]}>
    <Text style={styles.title}>Something went wrong.</Text>
    <Text style={styles.message}>{error.message}</Text>
    <Button onPress={resetErrorBoundary} title="Try again" color="#007BFF" />
  </View>
);


const App = () => {


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <ThemeProvider>
            <AppProvider>
              <AuthProvider>
                <SafeAreaView style={[styles.container, {
                  // marginTop: StatusBar.currentHeight
                }]}>
                  <MainNavigator />
                </SafeAreaView>
              </AuthProvider>
            </AppProvider>
          </ThemeProvider>
        </LanguageProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
