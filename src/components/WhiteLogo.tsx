import React from "react";
import {Image, View} from "react-native";

const WhiteLogo = () => {
  return (
    <View className="items-center">
      <Image className="w-[110] h-[100]" source={require("../assets/react-logo-white.png")} />
    </View>
  );
};

export default WhiteLogo;
