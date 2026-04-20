import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/common/CustomButton";
import { router } from "expo-router";
import { options } from "@/configs/data";
import { setAuthorizationHeader } from "@/hook/useUser";
import axios from "axios";

const AddVehicleScreen = () => {
  const [selected, setSelected] = useState("Toyota");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddVehicleProps>({
    make: "",
    model: "",
    year: "",
    mileage: "",
  });

  const onChangeHandler = (name: keyof AddVehicleProps, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = { ...formData, make: selected };
      if (!data.make || !data.mileage || !data.model || !data.year) {
        Alert.alert("Error", "Please fill the all fields");
        return;
      }
      await setAuthorizationHeader();
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/car/addVehicle`, {
        data,
      });

      setFormData({
        make: "",
        model: "",
        year: "",
        mileage: "",
      });
      router.push("/(routes)/problemDescription");
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
      edges={["left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.title}>Tell us about your vehicle</Text>
            <Text style={styles.subtitle}>
              {"We'll use this to provide accurate AI diagnostics."}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Make</Text>

            <Pressable
              style={styles.dropdownInput}
              onPress={() => setOpen(!open)}
            >
              <Text style={styles.inputText}>{selected}</Text>
              <Ionicons
                name={open ? "chevron-up" : "chevron-down"}
                size={18}
                color="#6B7280"
              />
            </Pressable>

            {open && (
              <View style={styles.dropdown}>
                {options.map((item) => {
                  const isSelected = selected === item;

                  return (
                    <Pressable
                      key={item}
                      style={[styles.item, isSelected && styles.selectedItem]}
                      onPress={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          isSelected && styles.selectedText,
                        ]}
                      >
                        {item}
                      </Text>

                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color="#2563EB" />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Model</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Camry"
              value={formData.model}
              onChangeText={(text) => onChangeHandler("model", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2020"
              value={formData.year}
              onChangeText={(text) => onChangeHandler("year", text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mileage (mi)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter current mileage"
              value={formData.mileage}
              onChangeText={(text) => onChangeHandler("mileage", text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.tipBox}>
            <MaterialCommunityIcons
              name="lightbulb"
              size={moderateScale(20)}
              color="#FBC02D"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.tipText}>
              Tip: Accurate vehicle information helps our AI provide better
              diagnostics and repair estimates.
            </Text>
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
                title={"Continue"}
                onPress={() => onSubmit()}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    gap: moderateScale(5),
    paddingVertical: moderateScale(20),
  },
  title: {
    fontSize: fontSizes.FONT30,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: moderateScale(8),
  },
  subtitle: {
    fontSize: fontSizes.FONT20,
    color: COLORS.textSecondary,
    marginBottom: moderateScale(10),
  },
  inputContainer: {
    marginBottom: moderateScale(20),
  },
  label: {
    fontSize: fontSizes.FONT20,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: moderateScale(8),
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    fontSize: fontSizes.FONT20,
    color: COLORS.black,
  },
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
  },
  inputText: {
    fontSize: fontSizes.FONT20,
    color: COLORS.black,
  },
  tipBox: {
    flexDirection: "row",
    backgroundColor: "#FFF9C4",
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    alignItems: "flex-start",
    marginBottom: moderateScale(20),
  },
  tipText: {
    flex: 1,
    fontSize: fontSizes.FONT20,
    color: "#F57F17",
    lineHeight: moderateScale(20),
  },
  dropdown: {
    marginTop: moderateScale(2),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  item: {
    padding: moderateScale(14),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedItem: {
    backgroundColor: "#EFF6FF",
  },

  itemText: {
    fontSize: fontSizes.FONT20,
    color: "#374151",
  },

  selectedText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
