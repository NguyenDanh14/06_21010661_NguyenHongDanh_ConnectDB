import { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";

export default function App({ navigation, route }) {
  const user = route.params.userData;
  const [name, setName] = useState(user.name);
  const [pass, setPass] = useState(user.pass);
  const [img, setImg] = useState(user.img);
  const [id] = useState(user.id);

  const updateUser = async () => {
    try {
      const response = await fetch(`http://192.168.1.48:3000/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, pass, img }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      Alert.alert('Thành Công', 'Chỉnh sửa thông tin thành công');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://192.168.1.48:3000/api/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete user error:', errorData);
        Alert.alert("Error", errorData.error);
      } else {
        const data = await response.json();
        Alert.alert("Success", data.message);
        navigation.navigate('Login')
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "An error occurred while deleting the user: " + error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image style={{ width: 80, height: 80, borderRadius: 90 }} source={{ uri: user.img }} />
        <Text style={{ fontSize: 24, marginLeft: 15, fontWeight: 'bold' }}>{user.name}</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Text style={{ fontSize: 16 }}>User</Text>
          <TextInput value={name} onChangeText={setName} style={{ flex: 1, marginLeft: 10 }} />
        </View>

        <View style={styles.inputBox}>
          <Text style={{ fontSize: 16 }}>Pass</Text>
          <TextInput value={pass} onChangeText={setPass} style={{ flex: 1, marginLeft: 10 }} />
        </View>

        <View style={styles.inputBox}>
          <Text style={{ fontSize: 16 }}>Avatar</Text>
          <TextInput value={img} onChangeText={setImg} style={{ flex: 1, marginLeft: 10 }} />
        </View>

        <TouchableOpacity style={styles.touchSave} onPress={updateUser}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={[styles.touchSave, { backgroundColor: '#00bdd6' }]} onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.touchSave, { backgroundColor: 'red' }]} onPress={deleteUser}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete this Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  form: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    flex: 1,
  },
  inputBox: {
    borderWidth: 0.3,
    borderColor: 'grey',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  touchSave: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width:300,
    alignItems: 'center',
    marginLeft:40,
    backgroundColor: '#00bdd6',
  },
});
