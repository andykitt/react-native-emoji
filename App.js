import * as React from 'react';
import {View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EmojiPicker from './screens/EmojiPicker';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Boost Buddy"
        onPress={() => navigation.navigate('EmojiPicker')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="EmojiPicker"
          options={{headerShown: false}}
          component={EmojiPicker}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
