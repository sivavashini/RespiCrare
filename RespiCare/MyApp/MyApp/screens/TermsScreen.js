import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // For icons

const { width } = Dimensions.get("window");

export default function TermsScreen({ setAccepted }) {
  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <View style={styles.card}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.text}>
            Welcome to our application. By using this app, you agree to the following terms and conditions:
          </Text>
          <Text style={styles.list}>
            {"\n"}• The app provides hospital and doctor details.
            {"\n"}• User data is securely handled.
            {"\n"}• Unauthorized access is strictly prohibited.
            {"\n"}• We are not responsible for any incorrect information.
          </Text>
          <Text style={styles.text}>Please read carefully before proceeding.</Text>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => setAccepted(true)}>
          <LinearGradient colors={["#ff512f", "#dd2476"]} style={styles.buttonGradient}>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Accept & Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  scroll: {
    maxHeight: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

