 
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useColorScheme} from './hooks/useHooks';
import Navigation from './navigation';
import { useFonts } from 'expo-font';



export default function App() {

  const colorScheme = useColorScheme()
  
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Alimama_ShuHeiTi_Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (

    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 黑夜模式 */}
      <Navigation colorScheme={colorScheme} />
      {/* {state.isActivityIndicator && <Loading />} */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
