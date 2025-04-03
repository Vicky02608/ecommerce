import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../storage/context/AuthContext";
import { useAppTheme } from "../../storage/context/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface RegisterProps {
  navigation: NavigationProp<any>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { theme, themeProperties } = useAppTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [secureText, setSecureText] = useState(true);

  const triggerSnackbar = (message: string = "") => {
    setSnackbarMessage(message);
    setTimeout(() => setSnackbarMessage(""), 2000); // Clear after 2 seconds
  };

  const handleRegister = async () => {

  }

  const handleLoginNavigation = () => {
    navigation.goBack();
  };



  return (
    <View style={[dynamicStyles.container, {
      backgroundColor: themeProperties.backgroundColor,
    }]}>
      <View style={{ marginBottom: 30, alignItems: "center" }}>
        <Text style={{
          color: themeProperties.textColor,
           fontSize: 30,
          fontWeight: 'bold'
        }}>
          {t("create_account")}
        </Text>
        <Text style={{
          color: themeProperties.textColor,
           fontSize: 20,
          fontWeight: 'bold'
        }}>
          {t("signup_description")}
        </Text>
      </View>

      <TextInput
        style={[dynamicStyles.input, {
          backgroundColor: themeProperties.backgroundColor,
          color: themeProperties.textColor,
        }]}
        placeholder={t("email_placeholder")}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#AAAAAA"
      />

      <View style={dynamicStyles.passwordContainer}>
        <TextInput
          style={dynamicStyles.passwordInput}
          placeholder={t("password_placeholder")}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#AAAAAA"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "eye-off" : "eye"} size={24} color="#AAAAAA" />
        </TouchableOpacity>
      </View>

      <View style={[dynamicStyles.passwordContainer, {
        backgroundColor: themeProperties.backgroundColor,
      }]}>
        <TextInput
          style={[dynamicStyles.passwordInput, {
            color: themeProperties.textColor,
          }]}
          placeholder={t("confirm_password_placeholder")}
          secureTextEntry={secureText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#AAAAAA"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "eye-off" : "eye"} size={24} color="#AAAAAA" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={theme === "light" ? dynamicStyles.button : dynamicStyles.buttondark}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={dynamicStyles.buttonText}>{t("register_button")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[dynamicStyles.loginButton]} onPress={handleLoginNavigation}>
        <Text style={dynamicStyles.loginButtonText}>{t("have_account")}</Text>
      </TouchableOpacity>

    </View>
  );
};

const dynamicStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  input: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  button: {
    width: "90%",
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  buttondark: {
    width: "90%",
    backgroundColor: "#808080",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 25,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default Register;
