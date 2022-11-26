import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="justify-center items-center flex-1">
      <Text className='text-lg'>Welcome to <Text className='text-green-600 font-bold'>Mealy Driver App</Text></Text>
      <StatusBar style="auto" />
    </View>
  ); 
}
