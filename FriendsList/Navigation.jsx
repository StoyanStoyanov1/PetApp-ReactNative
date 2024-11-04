import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name='Freunde' component={HomeScreen}/>
      <Tab.Screen name='Einstellungen' component={SettingScreen}/>
      </Tab.Navigator>
      </NavigationContainer>
  );
}

