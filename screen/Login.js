import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/EvilIcons";

import { useState, useEffect } from "react";
export default function App({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.48:3000/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    const checkAccount = data.find(
      (item) => item.name === user && item.pass === pass
    );
    if (checkAccount) {
      navigation.navigate("Home", { userData: checkAccount });
    } else {
      Alert.alert("Kiểm tra lại tài khoản và mật khẩu!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.style1}>
        <Image source={require("../assets/icon.png")} />
      </View>
      <View style={styles.style2}>
        <Text style={styles.textHello}>Hello Again!</Text>
      </View>
      <View style={styles.style3}>
        <Text style={styles.textLogin}>Log into your account</Text>
      </View>
      <View style={styles.style4}>
        <Image
          source={require("../assets/Vector.png")}
          style={styles.imgVector}
        />
        <TextInput
          style={styles.ipEmail}
          placeholder="Enter your username"
          keyboardType="username"
          value={user}
          onChangeText={setUser}
        />
      </View>
      <View style={styles.style5}>
        <Image source={require("../assets/lock.png")} style={styles.imglock} />
        <TextInput
          style={styles.ipPassword}
          placeholder="Enter your password"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!showPassword}
        />
      </View>
      <TouchableOpacity  style={styles.style6 } onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.texrForgot}>Register</Text>
      </TouchableOpacity>
      <View style={styles.style7}>
        <TouchableOpacity onPress={handleLogin} style={styles.continueButton}>
          <Text style={styles.textContinue}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.style8}>
        <Text style={styles.textor}>or</Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/face.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/apple.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  style1: {
    marginTop: 140,
  },
  style2: {
    marginTop: 10,
  },
  textHello: {
    fontSize: 28,
    fontWeight: 600,
  },
  style3: {
    marginTop: 5,
  },
  textLogin: {
    fontSize: 11,
    color: "gray",
  },
  style4: {
    marginTop: 40,
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
    borderWidth: 1.5,
    borderColor: "#bababa",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  ipEmail: {
    color: "gray",
    padding: 10,
    outlineWidth: 0,
    width: 600,
  },
  style5: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
    borderWidth: 1.5,
    borderColor: "#bababa",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  ipPassword: {
    color: "gray",
    padding: 10,
    outlineWidth: 0,
    width: 600,
  },
  imgVector: {
    tintColor: "gray",
    marginTop: 13,
  },
  imglock: {
    tintColor: "gray",
    marginTop: 8,
  },
  imgeye: {
    tintColor: "black",
    marginTop: 8,
    marginLeft: 100,
  },
  style6: {
    marginLeft: 280,
    marginTop: 15,
  },
  texrForgot: {
    color: "#61a4ad",
   
    textDecorationLine: "underline"
  },
  style7: {
    marginTop: 20,
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#00bdd6",
    borderRadius: 10,
    paddingVertical: 12,
    width: 345,
  },
  textContinue: {
    color: "#ffffff",
    fontSize: 15,
  },
  style8: {
    marginTop: 30,
  },
  textor: {
    color: "gray",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    padding: 3,
  },
});
