import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './screens/Main';
import List from './screens/List';
import Configuration from './screens/Configuration';


const AppNavigator = createStackNavigator({
  Home: {
    screen: Main
  },
  Configuration: {
    screen: Configuration
  },
  List: {
    screen: List
  }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#FF8700'
    },
    headerTintColor: '#111',
    headerTitleStyle: {
      fontWeight: '800',
      textAlign: 'center',
    }
  }
})

export default createAppContainer( AppNavigator );