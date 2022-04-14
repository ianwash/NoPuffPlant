import { StyleSheet, View, Image, Dimensions, Animated, Text} from 'react-native';
import React, { useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Octicons } from '@expo/vector-icons';
import plant from '../assets/plant-onboarding.png';
import pot from '../assets/pot-onboarding.png'; 
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
    Green
} from '../components/styles.js';

const {brand, tertiary} = Colors;

export const Onboarding = ({navigation, route}) => { 
  const { name } = route.params;
  // gets current user's uid
  const uid = auth.currentUser?.uid;
  // handles the write to database
  const handleIntake = (updates) => {
    console.log(updates);
    const firestore = getFirestore();
    const currentAsInt = parseInt(updates.current);
    const goalAsInt = parseInt(updates.goal);
    updateDoc(doc(firestore, "users", uid), {
        current: currentAsInt, 
        goal: goalAsInt,
      }).then(() => {
        const message = "Thanks! Getting your space set up now.";
        navigation.navigate("Intermediate", {message: message});
      });
  }

    // deals with plant animation
    const animated = new Animated.Value(0);
    const duration = 5000;
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animated, {
            toValue: 10,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animated, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, []);

    return (
        <Swiper showsPagination={false} loop={false} showsButtons={true} buttonWrapperStyle={styles.nav} >
            
            {/* THIS IS FOR THE WELCOME PAGE */}
            <StyledContainer>
                <Green />
                <GreyedOut2 />
                <Animated.View style={{transform: [{translateY: animated}] }}>
                  <View>
                    <Image style = {styles.logo} source = {plant} />
                  </View>
                </Animated.View>
                <View>
                  <Image style = {styles.logo} source = {pot} />
                </View>
                <Text style={styles.large}>Welcome {name}!</Text>
                <Text style={styles.sub}>I can't wait to go on this journey with you.</Text>
            </StyledContainer>

            {/* THIS IS FOR INTAKE FORM */}
            <StyledContainer>
              <Green />
              <GreyedOut2 />
              <StatusBar style="dark" />
              <KeyboardAvoidingWrapper>
                  <InnerContainer>
                      <Text style={styles.header}>I just need you to answer two short questions!</Text>
                      <Formik
                          initialValues={{current: "", goal: ""}}
                          onSubmit={(values) => {
                              console.log(values);
                              handleIntake(values);
                          }}
                      >
                          {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <Text style={styles.questionPrompt}>About how many times a day do you vape?</Text>
                              <MyTextInput 
                                  icon="pencil"
                                  placeholder="0"
                                  onChangeText={handleChange('current')}
                                  onBlur={handleBlur('current')}
                                  value={values.current}
                                  keyboardType="numeric"
                                  autoCapitalize="none"
                              />
                              <Text style={styles.questionPrompt}>What is your new goal?</Text>
                              <MyTextInput 
                                  icon="pencil"
                                  placeholder="0"
                                  onChangeText={handleChange('goal')}
                                  onBlur={handleBlur('goal')}
                                  value={values.goal}
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
        </Swiper>
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
      paddingTop: 0,
      fontWeight: 'bold',
      color: "#122931",
      textAlign: 'center', 
      paddingBottom: 20
    },
  });
