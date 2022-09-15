import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { BackHandler, ToastAndroid, Platform , StyleSheet} from "react-native";

export default class App extends React.Component {

  WEBVIEW_REF = React.createRef();

  state = {
    canGoBack: false,
    currentCount: 0
  };

  componentDidMount() {
    
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.currentCount < 1) {
      this.WEBVIEW_REF.current.goBack();
      this.state.currentCount = 1;

      // ToastAndroid.show("Premi due volte per chiudere l'applicazione", ToastAndroid.SHORT);
      
      setTimeout(() => {
        this.state.currentCount = 0;
      }, 1000);

      return true;
    } else {
     
      BackHandler.exitApp();
    }
    
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }
  render() {
     return <>
      <StatusBar hidden={(Platform.OS === 'ios') ? false : true} />       
                 
      <WebView style={styles.container} source={{ uri: '##' }}
      ref={this.WEBVIEW_REF}
      onNavigationStateChange={this.onNavigationStateChange}
      allowsBackForwardNavigationGestures={true}
      />
      </>;
  }
}

const styles = StyleSheet.create( {
  container :{
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  }
});

