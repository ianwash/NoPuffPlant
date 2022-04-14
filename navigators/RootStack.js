import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeBase from './../Screens/HomeBase';
import Login from './../Screens/Login';
import Signup from './../Screens/Signup';
import Onboarding from './../Screens/Onboarding'
import Intermediate from './../Screens/Intermediate'
import NewGoal from './../Screens/NewGoal'
import ForgotPassword from './../Screens/ForgotPassword'


const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="HomeBase" component={HomeBase}/>
                <Stack.Screen name ="Onboarding" component={Onboarding} />
                <Stack.Screen name ="Intermediate" component={Intermediate} />
                <Stack.Screen name ="NewGoal" component={NewGoal} />
                <Stack.Screen name ="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;

