
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function CustomHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color="#fff" marginTop={20}/>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/SafeDropLogoLateral.png')} 
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 header: {
  backgroundColor: '#59a6f1',
  paddingHorizontal: 15,
  paddingTop: 40,
  paddingBottom: 35,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
},

logoContainer: {
  position: 'absolute',
  top: 40,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
},

logo: {
  width: 131.82,
  height: 65.91,
},


});
