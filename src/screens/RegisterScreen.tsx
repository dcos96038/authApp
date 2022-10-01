import {StackScreenProps} from "@react-navigation/stack";
import React, {useContext, useEffect} from "react";
import {Alert, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

import WhiteLogo from "../components/WhiteLogo";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "../hooks/useForm";
import {RootStackParamsList} from "../navigators/StackNavigator";

interface Props extends StackScreenProps<RootStackParamsList, "Register"> {}

const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, name, onChange} = useForm({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Registro incorrecto", errorMessage, [{text: "Ok", onPress: () => removeError()}]);
  }, [errorMessage]);

  const onRegister = () => {
    signUp({correo: email, password, nombre: name});
    Keyboard.dismiss();
  };

  return (
    <>
      <ScrollView className="flex-1 ">
        <View className="p-[20] min-h-screen justify-center bg-[#5856D6]">
          <WhiteLogo />
          <Text className="text-white text-2xl font-bold mt-[20]">Registro</Text>

          <Text className="text-white text-xl font-bold mt-[25]">Nombre</Text>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            className="text-lg text-white"
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectionColor="white"
            underlineColorAndroid={"white"}
            value={name}
            onChangeText={(value) => onChange(value, "name")}
            onSubmitEditing={onRegister}
          />

          <Text className="text-white text-xl font-bold mt-[25]">Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            className="text-lg text-white"
            keyboardType="email-address"
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectionColor="white"
            underlineColorAndroid={"white"}
            onChangeText={(value) => onChange(value, "email")}
            onSubmitEditing={onRegister}
          />

          <Text className="text-white text-xl font-bold mt-[25]">Contraseña</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            className="text-lg text-white"
            placeholder="Ingrese su contraseña"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry={true}
            selectionColor="white"
            underlineColorAndroid={"white"}
            onChangeText={(value) => onChange(value, "password")}
            onSubmitEditing={onRegister}
          />

          <View className="mt-[50]  items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              className="border-2 border-white w-[200] items-center py-[5] px-[20] rounded-3xl"
              onPress={onRegister}
            >
              <Text className="text-lg font-bold text-white active:border-red-500">
                Crear Cuenta
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-[20] items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              className="border-2 w-[200] items-center border-white py-[5] px-[20] rounded-3xl"
              onPress={() => navigation.replace("Login")}
            >
              <Text className="text-lg font-bold text-white active:border-red-500">
                Ya tengo cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;
