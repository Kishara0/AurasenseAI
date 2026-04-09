import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { moderateScale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { fontSizes } from "@/themes/app.constant";
import { router } from "expo-router";
import CustomButton from "@/components/common/CustomButton";
import { useDiagnosisStore } from "@/store/diagnosisStore";

const issues = [
  "Strange noise from engine",
  "Warning light on",
  "Unusual vibration",
  "Overheating",
  "Braking issues",
  "Fluid leak",
  "Electrical problem",
];

const ProblemDescriptionScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const setTextParam = useDiagnosisStore(state => state.setText);

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
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
          <Text style={{ color: COLORS.textSecondary, textAlign: "right" }}>
            STEP 1 OF 4
          </Text>

          <Text style={styles.title}>What's happening with your vehicle?</Text>

          <View style={styles.chipContainer}>
            {issues.map((item) => {
              const isSelected = selected.includes(item);

              return (
                <Pressable
                  key={item}
                  onPress={() => toggleSelect(item)}
                  style={[styles.chip, isSelected && styles.chipActive]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextActive,
                    ]}
                  >
                    {item}
                  </Text>

                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color="#fff"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Detailed Description</Text>

          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us more about when it happens, e.g., only when accelerating or turning..."
            style={styles.textArea}
            textAlignVertical="top"
          />
          <CustomButton
            title="Continue"
            onPress={() => {
              const fullDescription = selected.join(', ') + ". " + description;
              setTextParam(fullDescription);
              router.push("/(routes)/audioRecording");
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProblemDescriptionScreen;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
  },

  title: {
    fontSize: fontSizes.FONT26,
    fontWeight: "700",
    color: "#111827",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: moderateScale(8),
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },

  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    fontSize: fontSizes.FONT20,
    color: "#374151",
  },

  chipTextActive: {
    color: COLORS.white,
    fontWeight: "600",
  },

  label: {
    fontSize: fontSizes.FONT20,
    fontWeight: "600",
    color: "#111827",
  },

  textArea: {
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    height: moderateScale(120),
    fontSize: fontSizes.FONT20,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
});
