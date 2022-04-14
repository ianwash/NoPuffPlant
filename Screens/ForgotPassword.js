import { StyleSheet, View, Dimensions, Text} from 'react-native';
import background2 from '../assets/background2.jpg';
import React from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Octicons } from '@expo/vector-icons';
import firebase from '@firebase/app-compat';
import {Formik} from 'formik';
import {
    StyledContainer, 
    InnerContainer, 
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel,
    StyledTextInput, 
    Colors, 
    StyledButton, 
    ButtonText, 
    Line,
    TextLink,
    TextLinkContent,
    BackgroundImage,
    GreyedOut, 
} from '../components/styles.js';

const {brand, tertiary} = Colors;

export const Onboarding = ({navigation}) => { 
    const handleForgotPassword = (credentials) => {
        firebase.auth().sendPasswordResetEmail(credentials.change)
            .then(() => { 
                alert("Go on, check your email!");
                navigation.navigate("Login");
            }).catch(error => alert(error.message))
    }
    return (
        <StyledContainer>
            <BackgroundImage source={background2} />
            <GreyedOut/>
            <KeyboardAvoidingWrapper>
                <InnerContainer>
                    <Text style={styles.header2}>Let's get you back into your account.</Text>
                      <Formik
                          initialValues={{change: ''}}
                          onSubmit={(values) => {
                              handleForgotPassword(values);
                          }}
                      >
                          {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <Text style={styles.questionPrompt}>Please enter your account email.</Text>
                              <MyTextInput 
                                  icon="mail"
                                  placeholder="example@gmail.com"
                                  onChangeText={handleChange('change')}
                                  onBlur={handleBlur('change')}
                                  value={values.change}
                                  keyboardType="email-address"
                                  autoCapitalize="none"
                              />
                              <Line/>
                              <StyledButton onPress={handleSubmit}>
                                  <ButtonText>Submit</ButtonText>
                              </StyledButton>
                              <View style={styles.space}></View>
                              <TextLink onPress={() => navigation.navigate("Login")}>
                                <TextLinkContent>Back to Login</TextLinkContent>
                            </TextLink>
                          </StyledFormArea>)}
                      </Formik>
                </InnerContainer>
            </KeyboardAvoidingWrapper>
        </StyledContainer>
    );
  }

  const MyTextInput = ({label, icon, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}
 export default Onboarding;

  const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height 
    },
    container: {
      flex: 1,
    },
    logo: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    circle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: tertiary,
      alignSelf: 'center',
      position: 'absolute',
      bottom: 35,
      borderColor: "#0fa271",
      borderWidth: 5,
    },
    rectangle: {
      width: Dimensions.get('window').width,
      height: 115,
      backgroundColor: "black",
      opacity: .80,
      position: 'absolute',
      bottom: 0,
    },
    vapeIcon: {
      color: "#0fa271",
      alignSelf: 'center',
      position: 'absolute',
      bottom: 20,
    },
    nav: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 350,
        left: 0,
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center', 
    },
    large: {
      fontSize: 35,
      alignSelf: 'center',
      paddingTop: 180,
      fontWeight: 'bold',
      color: "#122931"
    },
    sub: {
      fontSize: 18,
      alignSelf: 'center',
      paddingTop: 20,
      fontWeight: 'bold',
      color: "#122931",
      textAlign: 'center'
    },
    sub2: {
      fontSize: 18,
      alignSelf: 'center',
      paddingTop: 10,
      fontWeight: 'bold',
      color: "#122931",
      textAlign: 'center'
    },
    questionPrompt: {
      fontSize: 18,
      paddingTop: 10,
      fontWeight: 'bold',
      color: tertiary,
      textAlign: 'left'
    },
    header: {
      fontSize: 30,
      paddingTop: 10,
      fontWeight: 'bold',
      color: "#122931",
      textAlign: 'center', 
      paddingBottom: 20
    },
    header2: {
        fontSize: 30,
        paddingTop: 10,
        fontWeight: 'bold',
        color: tertiary,
        textAlign: 'center', 
        paddingBottom: 20
      },
      space: {
          padding: 10
      }
  });
