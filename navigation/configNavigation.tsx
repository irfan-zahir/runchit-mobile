import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { ConfigList, MembersConfig, RolesConfig, SearchableHeader } from '@screens/authenticated/configurations'
import { ConfigurationsParamList } from '@typings/navigation'

export const ConfigurationsNavigation: React.FC = () => <ConfigurationsNavigator />

const ConfigurationsStack = createNativeStackNavigator<ConfigurationsParamList>()

const ConfigurationsNavigator: React.FC = () => {

  const screenOptions: NativeStackNavigationOptions = {
    header: SearchableHeader,
    contentStyle: { paddingHorizontal: 16 }
  }

  return (
    <ConfigurationsStack.Navigator initialRouteName='ConfigList' screenOptions={screenOptions}>
      <ConfigurationsStack.Screen name='ConfigList' component={ConfigList} />
      <ConfigurationsStack.Screen name='Roles' component={RolesConfig} />
      <ConfigurationsStack.Screen name='Members' component={MembersConfig} />
    </ConfigurationsStack.Navigator>
  )
}