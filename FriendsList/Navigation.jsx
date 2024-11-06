import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Icon from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingsScreen';
import FriendsScreen from './screens/FriendsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerStyle : {backgroundColor: 'aliceblue'},
        }}>
            <Stack.Screen 
                name='HomeScreen' 
                component={HomeScreen} 
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name='Friend' 
                component={FriendsScreen} 
                options={({route}) => {
                  const {first, last} = route.params.friend.name
                  return {
                    title: `${first} ${last}`};
                  }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
              let icon;
              if (route.name === 'Home') {
                  icon = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {   
                  icon = focused ? 'settings' : 'settings-outline';
              }

              return (
                  <Icon.Ionicons
                      name={icon}
                      size={size}
                      color={color}
                  />
              );
          },
          tabBarActiveTintColor: 'orange',
          tabBarStyle: { backgroundColor: 'aliceblue' },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name='Home' 
          component={HomeStack}  
          options={{ title: "Freunde" }}
        />
        <Tab.Screen 
          name='Settings' 
          component={SettingScreen}
          options={{ title: "Einstellungen" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
