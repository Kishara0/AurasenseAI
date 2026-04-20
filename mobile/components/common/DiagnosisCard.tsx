import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { Ionicons } from '@expo/vector-icons'

const DiagnosisCard = ({ item, onPress }: DiagnosisCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.image}>
        <Image
          source={{ uri:"https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg" }}
          style={styles.imageInner}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Model: {item.model}</Text>
          <Text style={styles.date}>{item.year}</Text>
        </View>

        <Text style={styles.subtitle}>Make: {item.make}</Text>

        <Text style={styles.description}>Mileage: {item.mileage}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={moderateScale(18)}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  )
}

export default DiagnosisCard


const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
  },

  image: {
    width: scale(70),
    height: scale(40),
    borderRadius: moderateScale(12),
    overflow: "hidden",
  },

  imageInner: {
    width: "100%",
    height: "100%",
  },

  content: {
    flex: 1,
    marginLeft: moderateScale(12),
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(4),
  },

  badge: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(110),
  },

  badgeText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
  },

  date: {
    fontSize: moderateScale(12),
    color: "#9CA3AF",
  },

  title: {
    fontSize: moderateScale(14),
    fontWeight: "700",
    color: "#111827",
    marginBottom: moderateScale(2),
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: "#111827",
    marginBottom: moderateScale(2),
  },

  description: {
    fontSize: moderateScale(12),
    color: "#6B7280",
  },
});
