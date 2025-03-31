import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DoctorProfileScreen({ route }) {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{doctor.name}</Text>
      <Text style={styles.subtitle}>{doctor.specialty}</Text>
      <Text style={styles.text}>Experience: {doctor.experience}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#555", marginBottom: 10 },
  text: { fontSize: 16, color: "#333" },
});
