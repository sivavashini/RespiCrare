import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function PatientDetailsScreen({ route }) {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
      <Text style={styles.name}>{patient.name}</Text>
      <Text style={styles.vitals}>{patient.vitals}</Text>
      <Text style={styles.disease}>Detected Disease: {patient.disease}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  image: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold" },
  vitals: { fontSize: 16, marginVertical: 5 },
  disease: { fontSize: 18, color: "red", fontWeight: "bold" },
});
