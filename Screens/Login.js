import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {Octicons, Ionicons} from '@expo/vector-icons';
import background from '../assets/background2.jpg';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { auth } from '../firebase';
import logo from '../assets/logocopy.png';
import { View } from 'react-native';
import {
    StyledContainer, 
    InnerContainer, 
    SubTitle,
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel,
    StyledTextInput, 
    RightIcon,
    Colors, 
    StyledButton, 
    ButtonText, 
    MsgBox,
    Line,
    ExtraText, 
    ExtraView,
    TextLink,
    TextLinkContent,
    BackgroundImage,
    GreyedOut, 
} from './../components/styles.js';

const {brand, darkLight} = Colors;

export const Login = ({navigation}) => {
    // for hiding and showing password
    const [hidePassword, setHidePassword] = useState(true);

    //handles the login
    const handleLogin = (credentials) => {
        auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with: " + user.email);
            const message = "Hey, I remember you. Welcome back!"
            navigation.navigate("Intermediate", {message: message});
        }).catch(error => alert(error.message))
    }

    return(
        <StyledContainer>
            <BackgroundImage source={background} />
            <GreyedOut/>
            <StatusBar style="dark" />
            <BackgroundImage source={logo} />
            <KeyboardAvoidingWrapper>
                <InnerContainer>
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            handleLogin(values);
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <MyTextInput 
                                label="Email Address"
                                icon="mail"
                                placeholder="example@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autocomplete="off"
                            />
                            <MyTextInput 
                                label="Password"
                                icon="lock"
                                placeholder="•••••••••"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                autoCapitalize="none"
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Don't have an account already?  </ExtraText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <TextLinkContent>Sign Up</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                            <TextLink onPress={() => navigation.navigate("ForgotPassword")}>
                                <TextLinkContent>Forgot Password</TextLinkContent>
                            </TextLink>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </KeyboardAvoidingWrapper>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword &&(
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Login;