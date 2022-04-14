import { StyleSheet, View, Dimensions, Text} from 'react-native';
import React from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Octicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
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
    GreyedOut2, 
    Green,
} from '../components/styles.js';

const {brand, tertiary} = Colors;

export const Onboarding = ({navigation}) => { 
  // gets current user's uid
  const uid = auth.currentUser?.uid;
  // handles the write to database
  const handleChange = (updates) => {
    const changeAsInt = parseInt(updates.change);
    const firestore = getFirestore();
    updateDoc(doc(firestore, "users", uid), {
        goal: changeAsInt,
      }).then(() => {
        const message = "Your new goal has been set!";
        navigation.navigate("Intermediate", {message: message});
      });
  }

    return (
        <StyledContainer>
            <Green />
            <GreyedOut2/>
            <KeyboardAvoidingWrapper>
                <InnerContainer>
                    <Text style={styles.header}>Go ahead, tell me your new goal!</Text>
                      <Formik
                          initialValues={{change: ''}}
                          onSubmit={(values) => {
                              handleChange(values);
                          }}
                      >
                          {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <Text style={styles.questionPrompt}>You're one step closer to zero.</Text>
                              <MyTextInput 
                                  icon="pencil"
                                  placeholder="0"
                                  onChangeText={handleChange('change')}
                                  onBlur={handleBlur('change')}
                                  value={values.change}
                                  keyboardType="numeric"
                                  autoCapitalize="none"
                              />
                              <Line/>
                              <StyledButton onPress={handleSubmit}>
                                  <ButtonText>Submit</ButtonText>
                              </StyledButton>
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
  });
