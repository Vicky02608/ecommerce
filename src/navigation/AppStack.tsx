import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Dashboard ,Settings } from "../screens";
import { NAVIGATION } from "../utils/constants";

type RootStackParamList = {
  [NAVIGATION.DASHBOARD]: undefined;
  [NAVIGATION.SETTING]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


// Main Stack Navigator
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.DASHBOARD}
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.SETTING}
        component={Settings}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

// App Navigation Container
const AppNavigation = () => {
  return (
      <AppStack />
  );
};

export default AppNavigation;
