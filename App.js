import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  const [isEnabledGreen, setIsEnabledGreen] = useState(false);
  const [isEnabledYellow, setIsEnabledYellow] = useState(false);
  const [isEnabledRed, setIsEnabledRed] = useState(false);

  const [message, setMessage] = useState(false);
  var ws = new WebSocket("ws://192.168.1.105:8080");

  const toggleSwitchGreen = () => {
    try {
      ws.send(JSON.stringify({ type: "PORT", value: "1" }));
      setIsEnabledGreen(previousState => !previousState);
      setMessage("Green enabled");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const toggleSwitchYellow = () => {
    try {
      ws.send(JSON.stringify({ type: "PORT", value: "1" }));
      setIsEnabledYellow(previousState => !previousState);
      setMessage("Yellow enabled");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const toggleSwitchRed = () => {
    try {
      ws.send(JSON.stringify({ type: "PORT", value: "1" }));
      setIsEnabledRed(previousState => !previousState);
      setMessage("Red enabled");
    } catch (error) {
      setMessage(error.message);
    }
  }

  ws.onopen = function (event) {
    try {
      console.log("Connection established...");
    } catch (error) {
      setMessage(error.message);
    }
  };

  ws.onmessage = function(e) {
    try {
      console.log("Received: '" + e.data + "'");
      setMessage("Received: '" + e.data + "'");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native WebSocket</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.column}>
        <Text style={styles.label}>Green</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00ff00" }}
          thumbColor={isEnabledGreen ? "#00ff00" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchGreen}
          value={isEnabledGreen}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Yellow</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#fffb00" }}
          thumbColor={isEnabledYellow ? "#fffb00" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchYellow}
          value={isEnabledYellow}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Red</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#ff0000" }}
          thumbColor={isEnabledRed ? "#ff0000" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchRed}
          value={isEnabledRed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: 10
  },
  column: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dedede',
    padding: 20,
    margin: 10,
    flexGrow: 1,
    alignSelf: 'stretch',
  },
  message: {
    flex: 1,
    minHeight:30,
    margin:10
  },
  title: {
    flex: 1,
    minHeight: 30,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    margin: 5
  },
  label: {
    width: 60
  }
});
