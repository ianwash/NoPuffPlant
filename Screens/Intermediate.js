import { StyleSheet, View, Dimensions, Text} from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const { tertiary } = Colors;

import {
    StyledContainer, 
    Colors, 
    GreyedOut2, 
    Green
} from '../components/styles.js';


export const Intermediate = ({navigation, route}) => { 
    const {message} = route.params;
    const uid = auth.currentUser?.uid;
    const firestore = getFirestore();
    getDoc(doc(firestore, "users", uid)).then(docSnap => {
        if (docSnap.exists()) {
            var data = docSnap.data();

            // checks if the date is the same to reset
            const date = new Date;
            var day  = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();
            var year =  date.getFullYear().toString();
            var fDate = day + "-" + month + "-" + year;
            
            if (data.dateYesterday !== fDate) {
                // makes new history array
                var newHist = data.history;
                newHist[0] = newHist[1];
                newHist[1] = newHist[2];
                newHist[2] = 0;

                // calculates new streak
                var newStreak = data.streak;
                if (data.today > data.goal) {
                    newStreak = 0;
                } else {
                    newStreak++;
                }

                var newLevel = data.level;
                if (newStreak === 4) {
                  newLevel = 2;
                }
                if (newStreak === 10) {
                  newLevel = 3;
                }

                if (newStreak === 0) {
                  newLevel = 1;
                }

                // value for reset daily count
                var newToday = 0;
                // value of mood
                var newIsHappy = true;

                updateDoc(doc(firestore, "users", uid), {
                    dateYesterday: fDate, 
                    today: newToday,
                    history: newHist, 
                    streak: newStreak,
                    isHappy: newIsHappy, 
                    level: newLevel
                  }).then(() => {
                    getDoc(doc(firestore, "users", uid)).then(docSnap => {
                      if (docSnap.exists()) {
                          var data2 = docSnap.data();
                          setTimeout(() => {
                            navigation.navigate("HomeBase", {name: data2.name, current: data2.current, goal: data2.goal, streak: data2.streak, history: data2.history, today: data2.today, isHappy: data2.isHappy, level: data2.level});
                        }, 1000);
                      }
                  })
                  });
            }
            setTimeout(() => {
              navigation.navigate("HomeBase", {name: data.name, current: data.current, goal: data.goal, streak: data.streak, history: data.history, today: data.today, isHappy: data.isHappy, level: data.level}); //this.props.navigation.navigate('Login')
          }, 1000);
        } else {
            console.log("Did not get data.");
        }
    })

    return (
        <StyledContainer>
            <Green />
            <GreyedOut2 />
            <View style={styles.dash}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </StyledContainer>
    );
  }

 export default Intermediate;

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
    large: {
        fontSize: 35,
        alignSelf: 'center',
        paddingTop: 180,
        fontWeight: 'bold',
        color: "#122931"
      },
    dash: {
        alignItems: 'center'
    }, 
    message: {
        fontSize: 20,
        paddingTop: 350,
        fontWeight: 'bold',
        color: "#122931"
    },
  });
