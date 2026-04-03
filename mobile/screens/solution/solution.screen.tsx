import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fontSizes } from "@/themes/app.constant";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { router } from "expo-router";

const SolutionScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <BackButton />
      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(20),
          marginTop: moderateScale(20),
          gap: moderateScale(20),
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: moderateScale(20),
          }}
        >
          <View style={styles.card}>
            <Ionicons name="scan-circle" size={scale(30)} color="#4F8EF7" />

            <View style={styles.textContainer}>
              <Text style={styles.title}>Photo Analysis</Text>
              <Text style={styles.subtitle}>Scanning dashboard...</Text>
            </View>

            <MaterialIcons
              name="photo-library"
              size={scale(30)}
              color="#4F8EF7"
            />
          </View>

          <View style={styles.card}>
            <Ionicons name="settings" size={scale(30)} color="#9C6BFF" />

            <View style={styles.textContainer}>
              <Text style={styles.title}>AI Consultation</Text>
              <Text style={styles.subtitle}>Processing acoustics...</Text>
            </View>

            <MaterialIcons name="graphic-eq" size={scale(30)} color="#C4B5FD" />
          </View>
        </View>

        <View
          style={{
            borderRadius: scale(20),
            overflow: "hidden",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@/assets/others/solution-image.jpg")}
            resizeMode="cover"
            style={{
              width: "100%",
              height: verticalScale(280),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.white,
              paddingVertical: moderateScale(12),
              paddingHorizontal: moderateScale(16),
              borderRadius: scale(30),
              gap: moderateScale(10),
              position: "absolute",
              bottom: 10,
              width: "90%",
            }}
          >
            <View
              style={{
                width: scale(32),
                height: scale(32),
                borderRadius: scale(16),
                backgroundColor: COLORS.lightGreen,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={scale(18)} color="#22C55E" />
            </View>
            <Text style={{ fontSize: moderateScale(16), fontWeight: "600" }}>
              Issue Identified: Alternator
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: fontSizes.FONT30,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Your pocket mechanic.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: fontSizes.FONT22,
              color: COLORS.textSecondary,
            }}
          >
            We use audio, photos, and questions to provide accurate diagnostics.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>router.push("/(routes)/signUp")}
          style={{
            backgroundColor: "#5A7DFF",
            paddingVertical: moderateScale(16),
            borderRadius: scale(30),
            alignItems: "center",
            marginTop: moderateScale(20),
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: fontSizes.FONT21,
              fontWeight: "600",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SolutionScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: moderateScale(10),
    width: "100%",
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: scale(30),
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontWeight: "700",
    fontSize: fontSizes.FONT24,
  },

  subtitle: {
    fontSize: fontSizes.FONT20,
    color: COLORS.textSecondary,
  },
});
