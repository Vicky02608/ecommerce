import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationProp } from "@react-navigation/native";
import { NAVIGATION } from "../../utils/constants";
import { useAuth } from "../../storage/context/AuthContext";
import { useAppTheme } from "../../storage/context/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


interface LoginProps {
  navigation: NavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { theme, themeProperties } = useAppTheme();
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegisterNavigation = () => {
    navigation.navigate(NAVIGATION.REGISTRATION);
  };

  const handlefogetpassword = () => {
    navigation.navigate(NAVIGATION.FORGET_PASSWORD);
  }



  return (
    <View style={[dynamicStyles.container, {
      backgroundColor: themeProperties.backgroundColor,
    }]}>
      <View style={{ marginBottom: 30, alignItems: "center" }}>
        <Text style={{
          color: themeProperties.textColor,
          fontSize: 40,
          fontWeight:'bold'
        }}>
          {t("greeting")}
        </Text>
        <Text style={{
          color: themeProperties.textColor,
          fontSize: 20,
          fontWeight:'bold'
        }}>
          {t("get_started")}
        </Text>
        <Text style={{
          color: themeProperties.textColor,
          fontSize: themeProperties.textSize,
          fontWeight:'bold'
        }}>
          {t("login_description")}
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
        onChangeText={setEmail}
        placeholderTextColor="#AAAAAA"
      />
      <View style={[dynamicStyles.passwordContainer, {
        backgroundColor: themeProperties.backgroundColor,
      }]}>
        <TextInput
          style={[dynamicStyles.passwordInput, {
            color: themeProperties.textColor,
          }]}
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

      <Pressable onPress={handlefogetpassword} style={{
        justifyContent: 'flex-end',
        width: "85%", alignContent: 'flex-end',
        alignItems: 'flex-end', marginVertical: 10, marginTop: 18,
      }}>

        <Text style={{
          color: themeProperties.textColor,
          fontSize: themeProperties.textSize,
        }}>
          {t("forget_password")}
        </Text>
      </Pressable>

      <TouchableOpacity
        style={theme === "light" ? dynamicStyles.button : dynamicStyles.buttondark}
        onPress={(() => {
          login("l")
        })}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={dynamicStyles.buttonText}>{t("login_button")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[dynamicStyles.registerButton, {

        }]}
        onPress={handleRegisterNavigation}
      >
        <Text style={dynamicStyles.registerButtonText}>{t("register_button")}</Text>
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
  button: {
    width: "90%",
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttondark: {
    width: "90%",
    backgroundColor: "#808080",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButton: {
    marginTop: 25,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
