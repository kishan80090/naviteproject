import { View, Text, Pressable, StyleSheet } from "react-native-web";
function App() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={()=>alert("hellow")}
        onLongPress={() => alert("Long Press!")}
        style={styles.button}>
        <Text style={styles.text}>Click Me</Text>
      </Pressable>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "lightgray",
  },
  text: {
    color: "black",
    fontSize: 18,
  },
});
