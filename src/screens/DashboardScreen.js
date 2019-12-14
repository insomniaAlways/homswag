import React from 'react';
import { View, Text, Button } from 'react-native';

function Dashboard(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Go to Items" onPress={() => props.navigation.navigate('Items')}></Button>
    </View>
  );
}

export default Dashboard;
