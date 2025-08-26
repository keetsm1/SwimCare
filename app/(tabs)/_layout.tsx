import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen 
        name= "home"
        options= {{
          title: "Home",
          headerShown: false,
          tabBarStyle:{
            backgroundColor: "#ffffff",
          },
          tabBarActiveTintColor: '007AFF',
          tabBarInactiveTintColor: '#444',
          tabBarIcon: ({color,size})=>(
            <Ionicons 
            name= "home-sharp"
            size= {size}
            color= {color}
            />
          )
        }}
      />

      <Tabs.Screen
        name= "data"
        options = {{
          title: "Data",
          headerShown: false, 
          tabBarStyle: {
            backgroundColor: "#ffffff",
          },
          tabBarActiveTintColor: '007AFF',
          tabBarInactiveTintColor: '#444',
          tabBarIcon: ({color,size}) =>(
            <Ionicons
            name= "analytics"
            size= {size}
            color= {color}
            />
          )
        }}
      />

      <Tabs.Screen
        name= "analytics"
        options = {{
          title: "Analytics",
          headerShown: false, 
          tabBarStyle: {
            backgroundColor: "#ffffff",
          },
          tabBarActiveTintColor: '007AFF',
          tabBarInactiveTintColor: '#444',
          tabBarIcon: ({color,size}) =>(
            <Ionicons
            name= "information-circle-outline"
            size= {size}
            color= {color}
            />
          )
        }}
      />

      <Tabs.Screen
        name= "account"
        options = {{
          title: "Account",
          headerShown: false, 
          tabBarStyle: {
            backgroundColor: "#ffffff",
          },
          tabBarActiveTintColor: '007AFF',
          tabBarInactiveTintColor: '#444',
          tabBarIcon: ({color,size}) =>(
            <Ionicons
            name= "person-circle-outline"
            size= {size}
            color= {color}
            />
          )
        }}
      />

      
    </Tabs>
  );
}
