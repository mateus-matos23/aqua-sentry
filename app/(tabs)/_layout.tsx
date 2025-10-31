import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: '#999999',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: Platform.OS === 'android' ? 70 : 60,
                    paddingBottom: Platform.OS === 'android' ? 12 : 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerStyle: {
                    backgroundColor: '#2196F3',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Monitoramento',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="water" size={size} color={color} />
                    ),
                    headerTitle: 'Nível do Tanque',
                }}
            />
            <Tabs.Screen
                name="fish"
                options={{
                    title: 'Peixes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="fish" size={size} color={color} />
                    ),
                    headerTitle: 'Gestão de Peixes',
                }}
            />
            <Tabs.Screen
                name="tanks"
                options={{
                    title: 'Tanques',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="water-damage" size={size} color={color} />
                    ),
                    headerTitle: 'Gestão de Tanques',
                }}
            />
        </Tabs>
    );
}
