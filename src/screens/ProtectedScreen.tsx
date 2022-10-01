import React, {useContext} from "react";
import {Button, Text, View} from "react-native";

import {AuthContext} from "../context/AuthContext";

const ProtectedScreen = () => {
  const {user, token, logout} = useContext(AuthContext);

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-2xl mb-[20]">Protected Screen</Text>
      <Button color="#5856D6" title="logout" onPress={() => logout()} />

      <Text className="text-xl">{JSON.stringify(user, null, 5)}</Text>
      <Text className="text-lg">{JSON.stringify(token, null, 5)}</Text>
    </View>
  );
};

export default ProtectedScreen;
