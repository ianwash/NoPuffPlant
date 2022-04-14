import { StyleSheet, View, Image, Dimensions, Animated, TouchableOpacity, Text} from 'react-native';
import background2 from '../assets/background2.jpg';
import React, { useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import plant1happy from '../assets/plant1happy.png';
import plant1sad from '../assets/plant1sad.png';
import plant2happy from '../assets/plant2happy.png';
import plant2sad from '../assets/plant2sad.png';
import plant3happy from '../assets/plant3happy.png';
import plant3sad from '../assets/plant3sad.png';
import speech from '../assets/speech.png';
import pot from '../assets/pot.png'; 
import { auth } from '../firebase';
import { BarChart } from 'react-native-chart-kit';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
    StyledContainer, 
    SubTitle,
    Colors, 
    ButtonText, 
    Line2,
    BackgroundImage,
    GreyedOut2, 
    Green
} from './../components/styles.js';

const { tertiary } = Colors;


export const HomeBase = ({navigation, route}) => {  
  // gets the data that was passed
  const { name, goal, current, history, streak, today, isHappy, level} = route.params;
  // says what image to show
  var plant;
  switch (level) {
    case 1:
      if (!isHappy) {
        plant = plant1sad;
      } else {
        plant = plant1happy;
      }
      break;
    case 2:
      if (!isHappy) {
        plant = plant2sad;
      } else {
        plant = plant2happy;
      }
      break;
      case 3: 
        if (!isHappy) {
          plant = plant3sad;
        } else {
          plant = plant3happy;
        }
        break;
  }

  // formatting the Y axis 
  const formatDash = (original) => {
      return "";
  }

  // formats data for the dash
  const data = {
    labels: ['Day Before', 'Yesterday', 'Today'], 
    datasets: [
      {
      data: history
      }
    ]
  }
  const uid = auth.currentUser?.uid;

  // handles signing the user out
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  // handles the vaping
  const handleVape = () => {
    const firestore = getFirestore();
    const newToday = today + 1;
    // updates history array
    const newHistory = history;
    newHistory[2] = newToday;
    // update mood
    var newIsHappy = isHappy;
    if (newToday > goal) {
      newIsHappy = false;
    }
    updateDoc(doc(firestore, "users", uid), {
        today: newToday,
        history: newHistory, 
        isHappy: newIsHappy
      }).then(() => {
        const message = "Vape logged, thanks for telling me!";
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
        <Swiper index={1} showsPagination={false} loop={false} showsButtons={true} buttonWrapperStyle={styles.nav} >
            
            {/* THIS IS FOR THE DASHBOARD */}
            <StyledContainer>
                <Green />
                <GreyedOut2/>
                <StatusBar style="dark" />
                <View style={styles.dash}>
                    <Text style={styles.large}>Dashboard</Text>
                    <SubTitle>You got this, {name}! Keep it up!</SubTitle>
                    <BarChart
                    data={data}
                    width={300}
                    height={220}
                    chartConfig={{
                      backgroundColor: tertiary,
                      backgroundGradientFrom: tertiary,
                      backgroundGradientTo: tertiary,
                      decimalPlaces: 0, // optional, defaults to 2dp
                      formatYLabel: formatDash,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    showValuesOnTopOfBars={true}
                    fromZero
                    style={{
                      marginVertical: 8,
                      borderRadius: 20
                    }}
                  />
                  <Text style={styles.streak}>You're on a {streak} day streak.</Text>
                  <Text style={styles.streakAlt}>I'm at Level {level} right now. Keep that streak up so I can evolve!</Text>
                  <Text style={styles.streak}>You started at {current}, and now you're at a goal of {goal}.</Text>
                  <Text style={styles.streakAlt}>Look how far you've come!</Text>
                </View>
            </StyledContainer>
            
            {/* THIS IS FOR THE HOME PAGE */}
            <StyledContainer>
                <BackgroundImage source={background2} />
                <GreyedOut2 />
                <BackgroundImage source={speech} />   
                <Animated.View style={{transform: [{translateY: animated}] }}>
                  <View>
                    <Image style = {styles.logo} source = {plant} />
                  </View>
                </Animated.View>
                <View>
                  <Image style = {styles.logo} source = {pot} />
                </View>
                <View style={styles.rectangle}></View>
                <TouchableOpacity style={styles.circle} onLongPress={handleVape}>
                  <Entypo name="air" size={50} style={styles.vapeIcon} />
                </TouchableOpacity>
                <Text style={styles.count}>{today}</Text>
            </StyledContainer>

            {/* THIS IS FOR THE SETTINGS */}
            <StyledContainer>
                <Green />
                <GreyedOut2/>
                <StatusBar style="dark" />
                <View style={styles.dash}>
                    <Text style={styles.large}>Account Info</Text>
                    <SubTitle>Hello, {name}!</SubTitle>
                    <SubTitle>{auth.currentUser?.email}</SubTitle>
                    <SubTitle>Current Goal: {goal}</SubTitle>
                    <Line2 />
                    <TouchableOpacity style={styles.accountButtons} onPress={() => navigation.navigate("NewGoal")}>
                      <ButtonText style={styles.buttonText}>Update Goal</ButtonText>
                    </TouchableOpacity>
                    <Line2 />
                    <TouchableOpacity style={styles.accountButtons} onPress={handleSignOut}>
                      <ButtonText style={styles.buttonText}>Sign Out</ButtonText>
                    </TouchableOpacity>
                </View>
            </StyledContainer>

        </Swiper>
    );
  }
 export default HomeBase;

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
      height: Dimensions.get('window').height 
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
    count: {
      fontSize: 60,
      paddingTop: 270,
      fontWeight: 'bold',
      color: "#939393", 
      paddingLeft: 0, 
      paddingRight: 82,
      alignSelf:'center'
    }, 
    dash: {
      alignItems: 'center',
    }, 
    streak: {
      fontSize: 23,
      paddingTop: 10,
      fontWeight: 'bold',
      color: "#122931",
      textAlign: 'center'
    },
    streakAlt: {
      fontSize: 23,
      paddingTop: 10,
      fontWeight: 'bold',
      color: tertiary,
      textAlign: 'center'
    },
    accountButtons: {
      width: Dimensions.get('window').width - 100,
      height: 40,
      backgroundColor: tertiary,
      bottom: 0,
      alignContent: 'center',
      borderRadius: 5, 
    },
    buttonText: {
      alignSelf: 'center', 
      paddingTop: 10
    }, 
    accountInfo: {
      flexDirection: 'row'
    }, 
    card: {
      width: Dimensions.get('window').width - 100,
      height: 300,
      backgroundColor: tertiary,
      bottom: 0,
      alignContent: 'center',
      borderRadius: 5, 
    }, 
  });
