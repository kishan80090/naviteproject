import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native-web";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyAssignment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage("~~~Please fill all fields~~~");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("~~~Passwords do not match~~~");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
        confirmpassword: confirmPassword,
      });

      setMessage(response.data.message);
      navigate("/welcome");
    } catch (error) {
      console.error("API Error:", error);
      setMessage("Database Error");
    }
  };

  return (
    <View style={{ position: "relative", width: "100%", height: "100vh" }}>
      
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

      <View
        style={{
          flex: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          // zIndex: 1, 
        }}
      >
        <View
          style={{
            width: 350,
            padding: 20,
            backgroundColor: "rgba(255, 255, 255, 0.84)", 
            borderRadius: 10,
            boxShadow:" 0px 0px 25px blue",
           background: "linear-gradient(132deg,blue,white,blue)",
        }}
        >
          <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center", fontWeight: "bold"}}>
            Signup
          </Text>

          <Text>Name</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 }}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />

          <Text>Email</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
          />

          <Text>Password</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />
          
          <Text>Confirm Password</Text>
          <TextInput
            style={{ borderWidth: 1, marginBottom: 15, padding: 8, borderRadius: 5 }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
          />
          <Button title="Submit" onPress={handleSignup} />

          {message ? (
            <Text
              style={{
                marginTop: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              {message}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
export default CompanyAssignment;
