import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

function Testreact() {
  const [formData, setFormData] = useState({
    bookname: '',
    subject: '',
    price: ''
  });
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/books', { 

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      Alert.alert("Response", result.message);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.subHeading}>Add a Book</Text>

      <TextInput
        style={styles.input}
        placeholder="Bookname.."
        placeholderTextColor="gray"
        value={formData.bookname}
        onChangeText={(val) => handleChange("bookname", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Subject.."
        placeholderTextColor="red"
        value={formData.subject}
        onChangeText={(val) => handleChange("subject", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price.."
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(val) => handleChange("price", val)}
      />

      <Button title="Submit" color="red" onPress={handleSubmit} />
    </View>
  );
}

export default Testreact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 16,
    marginBottom: 10
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "30%",
    height: 40,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
    paddingHorizontal: 10
  }
});
