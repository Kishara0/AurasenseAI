import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/common/CustomButton";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import JWT from "expo-jwt";
import { router } from "expo-router";
import { Provider } from "@/configs/enum";
import { validateEmail } from "@/configs/validateEmail";

const SignUpScreen = () => {
  const [formData, setFormData] = useState<SignUpPros>({
    email: "",
    userName: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeHandler = (name: keyof SignUpPros, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.userName || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill the all fields");
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      const token = JWT.encode(
        { ...formData, provider: Provider.Local,avatar:`https://api.dicebear.com/7.x/adventurer/svg?seed=${formData.email}` },
        process.env.EXPO_PUBLIC_JWT_SECRET_KEY as string,
      );
      console.log(token);
      console.log(formData);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/signUp`,
        { signUpToken: token },
      );

      await SecureStore.setItemAsync("accessToken", response.data.accessToken);
      await SecureStore.setItemAsync("userName", formData.userName);
      await SecureStore.setItemAsync("email", formData.email);
      await SecureStore.setItemAsync(
        "avatar",
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${formData.email}`,
      );
      setLoading(false);
      router.push("/(routes)/subscription");
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      const message =
        error?.response?.data?.message || error.message || "Failed";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <BackButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: moderateScale(20),
            gap: moderateScale(20),
            paddingBottom: moderateScale(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "column",
              gap: moderateScale(10),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT35,
                fontWeight: "bold",
                color: COLORS.black,
                textAlign: "center",
              }}
            >
              Create your garage profile
            </Text>
            <Text
              style={{
                fontSize: fontSizes.FONT21,
                color: COLORS.textSecondary,
                textAlign: "center",
              }}
            >
              Save your vehicle history securely.
            </Text>
          </View>

          <View>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("@/assets/others/google.png")}
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={scale(20)} color="black" />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>User Name :</Text>
              <TextInput
                style={styles.input}
                placeholder="username"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.userName}
                onChangeText={(text) => onChangeHandler("userName", text)}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address:</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) => onChangeHandler("email", text)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="password"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.password}
                  onChangeText={(text) => onChangeHandler("password", text)}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={scale(20)}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {loading ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#5A7DFF",
                    paddingVertical: moderateScale(10),
                    borderRadius: scale(30),
                    width: "100%",
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.white} />
                </View>
              ) : (
                <CustomButton
                  title={"Create an account"}
                  onPress={() => handleSubmit()}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.textSecondary }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(routes)/signIn")}>
              <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    padding: moderateScale(15),
    borderRadius: moderateScale(30),
    marginBottom: moderateScale(16),
  },
  socialButtonText: {
    fontSize: fontSizes.FONT24,
    fontWeight: "600",
    color: COLORS.black,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: verticalScale(1),
    backgroundColor: COLORS.line,
  },
  dividerText: {
    marginHorizontal: moderateScale(5),
    color: COLORS.textSecondary,
    fontSize: fontSizes.FONT20,
  },
  inputContainer: {
    marginBottom: moderateScale(20),
  },
  inputLabel: {
    fontSize: fontSizes.FONT20,
    fontWeight: "500",
    color: COLORS.black,
    marginBottom: moderateScale(8),
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(30),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    fontSize: fontSizes.FONT20,
    color: COLORS.black,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(20),
  },

  passwordInput: {
    flex: 1,
    paddingVertical: moderateScale(16),
    fontSize: fontSizes.FONT20,
    color: COLORS.black,
  },
  eyeIcon: {
    color: COLORS.textSecondary,
    marginLeft: 10,
  },
});
