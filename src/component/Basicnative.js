import { View, Image, StyleSheet } from "react-native-web";

function Basicnative() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./pic/dog.jpg")} 
        style={styles.image}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", 
  },
  image: {
    width: 200,   
    height: 200,  
    borderRadius: 10,
  },
});

export default Basicnative;
