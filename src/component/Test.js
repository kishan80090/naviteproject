import { View, Text , StyleSheet,} from "react-native-web";

function Test() {
  return (
    <View>
      <Text style={styles.container}>
        Hellow Native
      </Text>
    </View>
  );
}
export default Test;

const styles = StyleSheet.create ({
    container: {
  color: "white", 
  fontSize: 18 ,
  backgroundColor:'red',
}


});
  
