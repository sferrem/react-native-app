import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewSaleScreen from '../screens/NewSaleScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
	  <Stack.Screen name="Home" component={HomeScreen} />
	  <Stack.Screen name="NewSale" component={NewSaleScreen} />
    </Stack.Navigator>
  );
}
