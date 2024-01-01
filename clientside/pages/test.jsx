import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button, ImageBackground, ActivityIndicator, Icon,Dimensions ,TextInput} from 'react-native'

export default function test({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('test2', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  )
}
