import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingsScreen';
import * as Icon from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator >
      <Tab.Screen 
      name='Freunde' 
      component={HomeScreen}  
      options={{title: "Freunde",tabBarIcon: ({ focused, size, color}) => {
        const icon = focused ? 'home' : 'home-outline';
        return ( 
            <Icon.Ionicons 
            name={icon}
            size={size} 
            color={color}
        />) 
    }}
      }
      />
      <Tab.Screen 
      name='Einstellungen' 
      component={SettingScreen}
      options={{title: "Einstellungen",tabBarIcon: ({focused, size, color}) => {
        const icon = focused ? 'settings' : 'settings-outline'
      return (
            <Icon.Ionicons 
            name={icon}
            size={size} 
            color={color}
        />)
     }}
       }
      />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

