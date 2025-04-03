import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationProp } from "@react-navigation/native";
import { useAppTheme } from "../../storage/context/ThemeContext";

interface ForgetPasswordProps {
  navigation: NavigationProp<any>;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, themeProperties } = useAppTheme();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);




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
          {t("reset_password")}
        </Text>
        <Text style={
          {
            color: themeProperties.textColor,
            fontSize: 18,
            fontWeight: 'bold'
          }
        }>
          {t("reset_description")}
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
        onChangeText={(text: string) => setEmail(text)}
        placeholderTextColor="#AAAAAA"
      />

      <TouchableOpacity
        style={theme === "light" ? dynamicStyles.button : dynamicStyles.buttonDark}
        onPress={() => { }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={dynamicStyles.buttonText}>{t("send_reset_link")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={dynamicStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={dynamicStyles.backButtonText}>{t("go_back")}</Text>
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
  buttonDark: {
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
  backButton: {
    marginTop: 25,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgetPassword;
