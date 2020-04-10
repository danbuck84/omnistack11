import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Books from './pages/Books';
import Details from './pages/Details';

export default function Routes() {
    return (
        <NavigationContainer>
            
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Books" component={Books} />
                <AppStack.Screen name="Details" component={Details} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}
