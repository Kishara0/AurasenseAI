import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { fontSizes } from "@/themes/app.constant";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";

const DiagnosticChatLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <View style={[styles.header, { paddingTop: insets.top }]}>
              <Pressable style={styles.left} onPress={() => router.back()}>
                <AntDesign name="left" size={scale(20)} color="#005DE0" />
                <Text style={styles.backText}>Back</Text>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(10),
                }}
              >
                <View>
                  <Image
                    source={{
                      uri: "https://i.pravatar.cc/100?img=12",
                    }}
                    style={{
                      width: moderateScale(44),
                      height: moderateScale(44),
                      borderRadius: moderateScale(22),
                    }}
                  />

                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: moderateScale(10),
                      height: moderateScale(10),
                      borderRadius: moderateScale(5),
                      backgroundColor: "#22C55E",
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    Mechanic AI
                  </Text>

                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: "#6B7280",
                    }}
                  >
                    Online
                  </Text>
                </View>
              </View>

              <View style={{ width: scale(60) }} />
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default DiagnosticChatLayout;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F3F4F6",
    height: verticalScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(1),
  },

  backText: {
    color: COLORS.primary,
    fontSize: fontSizes.FONT20,
  },

  title: {
    fontSize: fontSizes.FONT25,
    fontWeight: "600",
    color: COLORS.black,
  },
});
