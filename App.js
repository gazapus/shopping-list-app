import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './screens/Main';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Main
  }
}, {
  initialRouteName: 'Home'
})

export default createAppContainer( AppNavigator );