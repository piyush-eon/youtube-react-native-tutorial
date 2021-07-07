import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SingleTodo from "./components/SingleTodo";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Tutorial</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Enter a todo"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        {todos?.map((todo) => (
          <SingleTodo
            todos={todos}
            setTodos={setTodos}
            todo={todo}
            key={todo.id}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7DAD9",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
});
