import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { slides } from "@/configs/data";
import Slider from "@/components/onBoarding/Slider";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { router } from "expo-router";
import { moderateScale, scale } from "react-native-size-matters";

const OnBoardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { width } = Dimensions.get("window");

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Slider {...item} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={32}
      />

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 12, 6],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: dotWidth,
                height: scale(6),
                borderRadius: scale(5),
                backgroundColor: COLORS.secondary,
                marginHorizontal: moderateScale(4),
                opacity,
              }}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#5A7DFF",
          paddingVertical: moderateScale(16),
          width: "85%",
          borderRadius: scale(30),
          alignItems: "center",
          marginBottom: moderateScale(20),
        }}
        onPress={() => {
          if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
              index: currentIndex + 1,
            });
          } else {
            router.push("/(routes)/solution");
          }
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: fontSizes.FONT21,
            fontWeight: "600",
          }}
        >
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
