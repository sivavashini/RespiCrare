import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window"); // Get screen width & height

const doctors = [
  { id: "1", name: "Dr. John Doe", specialty: "Cardiologist", experience: "10 years" },
  { id: "2", name: "Dr. Jane Smith", specialty: "Neurologist", experience: "8 years" },
];

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🏥 XYZ Hospital</Text>
      <Text style={styles.subtitle}>📍 Location: New York, USA</Text>
      <Text style={styles.subtitle}>📞 Contact: +1 234 567 890</Text>

      {/* Doctors List */}
      <Text style={styles.sectionTitle}>👨‍⚕️ Doctors:</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DoctorProfile", { doctor: item })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>{item.specialty} | {item.experience}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Full-Width Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={28} color="#ff7b00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Doctors")}>
          <Ionicons name="medkit" size={28} color="#555" />
          <Text style={styles.navText}>Doctors</Text>
        </TouchableOpacity>

        <View style={styles.detectButtonContainer}>
        <TouchableOpacity style={styles.detectButton} onPress={() => navigation.navigate("DetectScreen")}>
        <Ionicons name="scan" size={32} color="white" />
</TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Appointments")}>
          <Ionicons name="calendar" size={28} color="#555" />
          <Text style={styles.navText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={28} color="#555" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0", paddingBottom: 80 }, // Adjusted padding for navbar

  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },

  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 10, elevation: 3 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#666" },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: width, // Full screen width
    height: 80, // Adjusted height to remove gaps
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },

  navButton: { alignItems: "center", flex: 1 }, // Each button takes equal space
  navText: { fontSize: 12, color: "#555" },

  detectButtonContainer: {
    position: "absolute",
    bottom: 25, // Floating effect
    left: width / 2 - 35, // Centers the button horizontally
    alignItems: "center",
  },
  detectButton: {
    backgroundColor: "#ff7b00",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 65,
    left: -152,
    alignSelf: "center",
    elevation: 5,
  },
});

