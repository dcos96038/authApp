import {createStackNavigator} from "@react-navigation/stack";
import {useContext} from "react";

import ProtectedScreen from "../screens/ProtectedScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {AuthContext} from "../context/AuthContext";
import LoadingScreen from "../screens/LoadingScreen";

export type RootStackParamsList = {
  Login: undefined;
  Register: undefined;
  Protected: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const StackNavigator = () => {
  const {status} = useContext(AuthContext);

  if (status === "checking") return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: "white"}}}>
      {status !== "authenticated" ? (
        <>
          <Stack.Screen component={LoginScreen} name="Login" />
          <Stack.Screen component={RegisterScreen} name="Register" />
        </>
      ) : (
        <Stack.Screen component={ProtectedScreen} name="Protected" />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
