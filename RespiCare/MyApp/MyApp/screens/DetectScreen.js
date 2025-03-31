import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function DetectScreen({ navigation }) {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handles input change for each input field
  const handleInputChange = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  const handleDetect = async () => {
    if (inputs.some(input => input.trim() === "")) {
      Alert.alert("Input Required", "Please fill in all the input fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.238.31:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: inputs.map(Number) }), // Convert inputs to numbers
      });

      const data = await response.json();
      if (data.predicted_disease) {
        setResult(data.predicted_disease);
      } else {
        setResult("Unable to determine diagnosis. Try again.");
      }
    } catch (error) {
      console.error(error);
      setResult("Error connecting to the server.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Respiratory Disease Detector</Text>

      {/* Input Fields with Labels */}
      {["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"].map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${label}`}
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={inputs[index]}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        </View>
      ))}

      {/* Detect Button */}
      <TouchableOpacity style={styles.button} onPress={handleDetect} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Analyze</Text>}
      </TouchableOpacity>

      {/* Result Card */}
      {result && (
        <Card style={[styles.resultCard, { backgroundColor: getBackgroundColor(result) }]}>
          <View style={styles.resultContent}>
            <Ionicons name={getIconName(result)} size={30} color="#fff" style={styles.icon} />
            <Text style={styles.resultText}>{result}</Text>
          </View>
        </Card>
      )}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#ff7b00" />
      </TouchableOpacity>
    </View>
  );
}

// Function to get different colors based on disease severity
const getBackgroundColor = (disease) => {
  if (disease.toLowerCase().includes("normal")) return "#4CAF50"; // Green for normal
  if (disease.toLowerCase().includes("mild")) return "#FFC107"; // Yellow for mild conditions
  return "#F44336"; // Red for severe conditions
};

// Function to get different icons based on disease severity
const getIconName = (disease) => {
  if (disease.toLowerCase().includes("normal")) return "checkmark-circle";
  if (disease.toLowerCase().includes("mild")) return "warning";
  return "alert-circle";
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  
  inputContainer: { width: "90%", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, fontSize: 16, backgroundColor: "#fff" },
  
  button: { backgroundColor: "#ff7b00", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  
  resultCard: { width: "90%", padding: 15, marginTop: 20, borderRadius: 10, elevation: 5 },
  resultContent: { flexDirection: "row", alignItems: "center" },
  icon: { marginRight: 10 },
  resultText: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  backButton: { position: "absolute", top: 50, left: 20 },
});

