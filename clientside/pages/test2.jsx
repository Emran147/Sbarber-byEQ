import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button, ImageBackground, ActivityIndicator, Icon,Dimensions ,TextInput} from 'react-native'

export default function test2({ route, navigation }) {
    const { itemId, otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('test2', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    )
}
