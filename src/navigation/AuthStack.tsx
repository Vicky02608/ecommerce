import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Login,ForgetPassword,IntroScreen ,Register,OTPScreen} from "../screens";
import { NAVIGATION } from "../utils/constants";

// Defining the navigation parameter list for type safety
type AuthStackParamList = {
  [NAVIGATION.INTRO]: undefined;
  [NAVIGATION.LOGIN]: undefined;
  [NAVIGATION.FORGET_PASSWORD]: undefined;
  [NAVIGATION.REGISTRATION]: undefined;
  [NAVIGATION.OTPSCREEN]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={NAVIGATION.INTRO} 
        component={IntroScreen} 
        options={{ headerShown: false }} 
      />
     <Stack.Screen 
        name={NAVIGATION.LOGIN} 
        component={Login} 
        options={{ headerShown: false }} 
      />
       {/* <Stack.Screen 
        name={NAVIGATION.FORGET_PASSWORD} 
        component={ForgetPassword} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name={NAVIGATION.REGISTRATION} 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name={NAVIGATION.OTPSCREEN} 
        component={OTPScreen} 
        options={{ headerShown: false }} 
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
