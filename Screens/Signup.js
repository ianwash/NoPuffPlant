import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import {Octicons, Ionicons} from '@expo/vector-icons';
import { auth } from '../firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import background from '../assets/background2.jpg';
import logo from '../assets/logocopy.png';
import {
    StyledContainer, 
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
    InnerContainer2
} from './../components/styles.js';
import { View } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const {brand, darkLight} = Colors;

export const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const handleSignUp = (credentials, name) => {
        try {
            if (credentials.password != credentials.confirmPassword) {
                throw 'Passwords do not match';
            }
            auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(userCredentials => {
                const user = userCredentials.user;
                const firestore = getFirestore();
                const date = new Date;
                var day  = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                var year =  date.getFullYear().toString();
                var fDate = day + "-" + month + "-" + year;
                setDoc(doc(firestore, "users", user.uid), {
                    name: credentials.name,
                    // how many days they met their goal
                    streak: 0,
                    // how many times per day they vape now
                    current: 0, 
                    // how many times they wish to vape 
                    goal: 0,
                    today: 0, 
                    // array for last 7 
                    history: [0, 0, 0],
                    // grabs the current date
                    dateYesterday: fDate, 
                    // for allocating the right image
                    level: 1,
                    // keeps track of mood
                    isHappy: true
                  }).then(() => {
                    navigation.navigate("Onboarding", {name});
                  });
            })
            .catch(error => alert(error.message));
        } catch (e) {
            alert(e);
        }
    }
    return(
        <StyledContainer>
            <BackgroundImage source={background} />
            <GreyedOut/>
            <StatusBar style="dark" />
            <BackgroundImage source={logo} />
            <KeyboardAvoidingWrapper>
                <InnerContainer2>
                    <SubTitle>Account Sign Up</SubTitle>

                    <Formik
                        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            handleSignUp(values, values.name);
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <MyTextInput 
                                label="First Name"
                                icon="person"
                                placeholder="Name"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
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
                            <MyTextInput 
                                label=" Confirm Password"
                                icon="lock"
                                placeholder="•••••••••"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                autoCapitalize="none"
                            />
                            <MsgBox></MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Sign Up</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Already have an account?  </ExtraText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer2>
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

export default Signup;