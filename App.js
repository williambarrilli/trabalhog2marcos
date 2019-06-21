//desabilitar especifico warning
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);
//YellowBox.ignoreWarnings(['source.uri should not be an empty string']);

import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './src/components/Login'
import Serie from './src/components/Serie';
import ListarSeries from './src/components/ListarSeries';
import CadastraSeries from './src/components/CadastraSeries';


const AppNavigator = createStackNavigator(
  {
    Login,
    ListarSeries,
    Serie,
    CadastraSeries
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#003399',
      },
      headerTitleStyle: {
        backgroundColor: '#003399',
        fontWeight: 'bold',
        textAlign: "center",
        flex: 1
      },
    },
  }
);
export default createAppContainer(AppNavigator);