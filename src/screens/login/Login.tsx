import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Pressable,
  Alert,
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
  const [username, setusername] = useState<string>("doejohn");
  const [password, setPassword] = useState<string>("test@123");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleRegisterNavigation = () => navigation.navigate(NAVIGATION.REGISTRATION);
  const handleForgetPassword = () => navigation.navigate(NAVIGATION.FORGET_PASSWORD);

  const validateFields = () => {
    let newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = "User Name is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token); // Call auth login function with token
        Alert.alert("Success", "Logged in successfully!");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: themeProperties.backgroundColor }]}>
      <View style={{ marginBottom: 30, alignItems: "center" }}>
        <Text style={[styles.heading, { color: themeProperties.textColor }]}>{t("greeting")}</Text>
        <Text style={[styles.subHeading, { color: themeProperties.textColor }]}>{t("get_started")}</Text>
        <Text style={[styles.description, { color: themeProperties.textColor }]}>{t("login_description")}</Text>
      </View>

      <TextInput
        style={[styles.input, { backgroundColor: themeProperties.backgroundColor, color: themeProperties.textColor }]}
        placeholder={t("username_placeholder")}
        value={username}
        onChangeText={setusername}
        placeholderTextColor={themeProperties.textColor}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <View style={[styles.passwordContainer, { backgroundColor: themeProperties.backgroundColor }]}>
        <TextInput
          style={[styles.passwordInput, { color: themeProperties.textColor }]}
          placeholder={t("password_placeholder")}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={themeProperties.textColor}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "eye-off" : "eye"} size={24} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Pressable onPress={handleForgetPassword} style={styles.forgotPassword}>
        <Text style={[styles.text, { color: themeProperties.textColor }]}>{t("forget_password")}</Text>
      </Pressable>

      <TouchableOpacity
        style={theme === "light" ? styles.button : styles.buttonDark}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>{t("login_button")}</Text>}
      </TouchableOpacity>


      <TouchableOpacity onPress={handleRegisterNavigation} style={styles.registerButton}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <Text style={styles.registerButtonText}>{t("register_button")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noAccountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 10,
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    width: "90%",
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    width: "85%",
    marginVertical: 10,
    marginTop: 18,
  },
  text: {
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
  buttonDark: {
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: 'lightblue',
    marginLeft: 10,
  },
});

export default Login;
