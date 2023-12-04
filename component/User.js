import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  addUser,
  deleteUser,
  updateUser,
  searchUser,
} from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const [data, setData] = useState([]);
  const [hiden, setHiden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    data.map((item) => {
      dispatch(addUser(item));
    });
  }, [data]);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({
      username: "",
      password: "",
      role: "",
    });
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser({ id }));
  };
  
  const [newUpdateUser, setNewUpdateUser] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });
  const handleUpdateUser = () => {
    dispatch(updateUser(newUpdateUser));
    setNewUpdateUser({
      username: "",
      password: "",
      role: "",
    });
    setHiden(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (text) => {
    setSearchTerm(text);
    dispatch(searchUser({ username: text }));
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "#333",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ width: 200, marginBottom: 10 }}>
          <Text>name: {item.username}</Text>
          <Text>password: {item.password}</Text>
          <Text>role: {item.role}</Text>
        </View>
        <Pressable
          onPress={() => handleDeleteUser(item.id)}
          style={{
            width: 50,
            height: 30,
            borderColor: "#000",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            backgroundColor: "red",
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setNewUpdateUser({
              id: item.id,
              username: item.username,
              password: item.password,
              role: item.role,
            });
            setHiden(true);
          }}
          style={{
            width: 50,
            height: 30,
            borderColor: "#000",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            backgroundColor: "green",
          }}
        >
          <Text style={{ color: "white" }}>Edit</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{
            width: 200,
            height: 40,
            borderColor: "#333",
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            margin: 10,
            padding: 10,
          }}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchTerm}
        ></TextInput>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {!hiden && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            placeholder="username"
            style={styles.input}
            onChangeText={(text) => setNewUser({ ...newUser, username: text })}
          ></TextInput>
          <TextInput
            placeholder="password"
            style={styles.input}
            onChangeText={(text) => setNewUser({ ...newUser, password: text })}
          ></TextInput>
          <TextInput
            placeholder="role"
            style={styles.input}
            onChangeText={(text) => setNewUser({ ...newUser, role: text })}
          ></TextInput>
          <Pressable
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleAddUser}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </Pressable>
        </View>
      )}
      {hiden && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            placeholder="username"
            style={styles.input}
            value={newUpdateUser.username}
            onChangeText={(text) =>
              setNewUpdateUser({ ...newUpdateUser, username: text })
            }
          ></TextInput>
          <TextInput
            placeholder="password"
            style={styles.input}
            value={newUpdateUser.password}
            onChangeText={(text) =>
              setNewUpdateUser({ ...newUpdateUser, password: text })
            }
          ></TextInput>
          <TextInput
            placeholder="role"
            style={styles.input}
            value={newUpdateUser.role}
            onChangeText={(text) =>
              setNewUpdateUser({ ...newUpdateUser, role: text })
            }
          ></TextInput>
          <Pressable
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleUpdateUser}
          >
            <Text style={{ color: "white" }}>Update</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 4,
    margin: 10,
    borderColor: "#333",
    borderWidth: 1,
    width: 300,
    height: 40,
  },
});
