import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Pressable, // Use FlatList here
} from "react-native";
import { NAVIGATION } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../storage/context/ThemeContext";
import HorizontalLine from "../../component/HorizontalLine";
import { CustomHeader } from "../../component";

const { width } = Dimensions.get("window");

type DashboardProps = {
  navigation: any;
}

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {

  const { t } = useTranslation();
  const { themeProperties, theme } = useAppTheme();
  const [activeTab, setActiveTab] = useState<string>("tab1")

  const tabIndicator = useRef(new Animated.Value(activeTab === "tab1" ? 0 : 1)).current;


  const switchTab = (tab: string) => {
    setActiveTab(tab);
    Animated.spring(tabIndicator, {
      toValue: tab === "tab1" ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const tabIndicatorTranslateX = tabIndicator.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 2],
  });


  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeProperties.backgroundColor },
      ]}
    >
      <StatusBar
        backgroundColor={theme === "light" ? "#ffffff" : "#000000"}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />


      <CustomHeader title="Dashboard"
        navigation={navigation}
        showBackButton={false}
        rightIcon="settings" onRightPress={() => {
          navigation.navigate(NAVIGATION.SETTING)
        }}

      />

      <View
        style={[
          styles.tabContainer,
          { backgroundColor: theme === "light" ? "#ffffff" : "#808080" },
        ]}
      >
        <TouchableOpacity
          style={styles.tab}
          onPress={() => switchTab("tab1")}
        >
          <Text
            style={[
              styles.tabText, { color: themeProperties.textColor },
              activeTab === "tab1" && styles.activeTabText,
            ]}
          >
            {t("tab1")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => switchTab("tab2")}
        >
          <Text
            style={[
              styles.tabText, { color: themeProperties.textColor },
              activeTab === "tab2" && styles.activeTabText,
            ]}
          >
            {t("tab2")}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.tabIndicator,
            { transform: [{ translateX: tabIndicatorTranslateX }] },
          ]}
        />
      </View>

      <HorizontalLine />

      {(
        activeTab === "tab1" ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Tab 1</Text> </View>
        ) : activeTab === "tab2" ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Tab 2</Text> </View>
        ) : null
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fab: {
    position: 'absolute',
    bottom: 55,
    right: 18,
    backgroundColor: '#3c69ea',
    borderRadius: 25,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  ownerName: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  settingsIcon: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  tabIndicator: {
    height: 3,
    width: width / 2.4,
    backgroundColor: "#007bff",
    borderRadius: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default Dashboard;
