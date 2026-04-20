import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { setAuthorizationHeader, useUser } from "@/hook/useUser";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "@/configs/uploadImageToCloudinary";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const ProfileScreen = () => {
  const { user } = useUser();
  const updateAvatar = useUserStore((state) => state.updateAvatar);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>();
  const logOutHandler = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("userName");
          await SecureStore.deleteItemAsync("email");
          await SecureStore.deleteItemAsync("avatar");
          router.replace("/(routes)/signIn");
        },
      },
    ]);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const cloudinary_URI = await uploadImageToCloudinary(
        image || "",
        "profile",
      );
      if (!cloudinary_URI) {
        Alert.alert("Image Upload failed");
        return;
      }
      await setAuthorizationHeader();
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/uploadImage`,
        {
          image: cloudinary_URI.cloudinary_URI,
        },
      );

      console.log(response);
      updateAvatar(response.data.avatar);

      setImage("");
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      const message =
        error?.response?.data?.message || error.message || "Failed";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const keepDefaultImage = async () => {
    try {
      setLoading(true);
      const imageURI = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`;
      await setAuthorizationHeader();
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/uploadImage`,
        {
          image: imageURI,
        },
      );
      updateAvatar(response.data.avatar);

      setImage("");
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      const message =
        error?.response?.data?.message || error.message || "Failed";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const isCloudinary = user?.avatar?.includes("https://res.cloudinary.com");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCenter}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: image ? image : user?.avatar?.replace("/svg", "/png"),
              }}
              style={styles.avatar}
            />

            <Pressable style={styles.editIcon} onPress={pickImage}>
              <Ionicons name="pencil" size={scale(14)} color="#fff" />
            </Pressable>
          </View>
          <View>
            {image && (
              <View
                style={{
                  flexDirection: "row",
                  gap: moderateScale(10),
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => setImage("")}
                  disabled={loading}
                  style={[styles.saveImage, { backgroundColor: "red" }]}
                >
                  <Entypo name="trash" size={scale(16)} color="white" />
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Remove
                  </Text>
                </Pressable>
                <Pressable
                  disabled={loading}
                  style={[styles.saveImage, { backgroundColor: "blue" }]}
                  onPress={() => uploadImage()}
                >
                  {loading ? (
                    <Text style={{ color: "white", fontWeight: "600" }}>
                      Saving....
                    </Text>
                  ) : (
                    <>
                      <Entypo name="save" size={scale(16)} color="white" />
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        Save
                      </Text>
                    </>
                  )}
                </Pressable>
              </View>
            )}
          </View>
          <View>
            {isCloudinary && (
              <Pressable
                onPress={keepDefaultImage}
                disabled={loading}
                style={[
                  styles.saveImage,
                  { backgroundColor: "green", marginTop: moderateScale(10) },
                ]}
              >
                {loading ? (
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Changing image...
                  </Text>
                ) : (
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Keep default image
                  </Text>
                )}
              </Pressable>
            )}
          </View>

          <Text style={styles.name}>{user?.userName}</Text>
          <View style={styles.badge}>
            <Ionicons name="star" size={scale(14)} color="#B45309" />
            <Text style={styles.badgeText}>Pro Member</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.item}>
          <View style={styles.left}>
            <View style={[styles.iconBox, { backgroundColor: "#E5EDFF" }]}>
              <Ionicons name="car" size={scale(24)} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.title}>My Garage</Text>
              <Text style={styles.subtitle}>2 Vehicles</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={scale(20)} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.left}>
            <View style={[styles.iconBox, { backgroundColor: "#FEF3C7" }]}>
              <MaterialIcons name="star" size={scale(24)} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.title}>Subscription Plan</Text>
              <Text style={styles.subtitle}>Next billing: Oct 24</Text>
            </View>
          </View>

          <View style={styles.right}>
            <Text style={styles.activeBadge}>Active</Text>
            <Ionicons name="chevron-forward" size={scale(20)} color="#9CA3AF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.left}>
            <View style={[styles.iconBox, { backgroundColor: "#F3F4F6" }]}>
              <Ionicons name="settings" size={scale(20)} color="#6B7280" />
            </View>
            <Text style={styles.title}>App Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={scale(20)} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.left}>
            <View style={[styles.iconBox, { backgroundColor: "#F3E8FF" }]}>
              <Ionicons name="help-circle" size={scale(20)} color="#8B5CF6" />
            </View>
            <Text style={styles.title}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={scale(20)} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={() => logOutHandler()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(20),
    gap: moderateScale(15),
  },

  headerCenter: {
    alignItems: "center",
    marginBottom: moderateScale(10),
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: scale(150),
    height: scale(150),
    borderRadius: 100,
    borderWidth: 5,
    borderColor: COLORS.white,
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: moderateScale(20),
    backgroundColor: "#7C3AED",
    padding: moderateScale(6),
    borderRadius: 999,
  },

  name: {
    fontSize: fontSizes.FONT25,
    fontWeight: "700",
    color: "#111827",
    marginTop: moderateScale(10),
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(6),
  },

  badgeText: {
    marginLeft: moderateScale(4),
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#B45309",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(12),
  },

  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: fontSizes.FONT22,
    fontWeight: "600",
    color: "#111827",
  },

  subtitle: {
    fontSize: fontSizes.FONT16,
    color: COLORS.textSecondary,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  activeBadge: {
    fontSize: 12,
    color: "#10B981",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  logout: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: moderateScale(13),
    borderRadius: moderateScale(16),
  },
  saveImage: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
    padding: moderateScale(5),

    borderRadius: moderateScale(10),
  },
  logoutText: {
    color: COLORS.white,
    fontSize: fontSizes.FONT22,
    fontWeight: "500",
    textAlign: "center",
  },
});
