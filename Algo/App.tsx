import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Content from './Contents/content';
import BinarySearch from './Contents/BinarySearch';
import CodeCompiler from './Compiler/CodeCompiler';
import CodeGenerate from './ChatGPT/CodeGenerate';
import Compiler from './ChatGPT/Compiler';
import { signIn } from './Login/GoogleLogin';
import { startFaceDetectionInBackground, stopFaceDetectionInBackground } from './Camera/CameraManager'; // 변경된 부분

const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '카메라 권한 요청',
              message: '이 앱을 사용하려면 카메라 권한이 필요합니다.',
              buttonPositive: '확인',
              buttonNegative: '취소',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('카메라 권한 허용됨');
          } else {
            console.log('카메라 권한 거부됨');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestCameraPermission();

    return () => {
      stopFaceDetectionInBackground();
      console.log('카메라 작동이 안됨');
    };
  }, []);

  const handleStart = () => {
    navigation.navigate('Content');
    startFaceDetectionInBackground();
    console.log('카메라 실행 중');
  };

  const handleSignIn = async () => {
    await signIn(navigation);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo/logo.png')} style={styles.logo} />
      <Text style={styles.description}>
        <Text style={styles.highlight}>Algo</Text>를 통한 간단한 {'\n'} 알고리즘
        학습
      </Text>
      <Text style={styles.subDescription}>
        알고리즘 학습 어플인 Algo는 복잡한 알고리즘을 손쉽게 학습할 수 있도록
        도와드립니다. 아래에 버튼을 눌러 알고리즘 학습을 시작하세요!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>
          <Text style={styles.buttonHighlight}>Google</Text > 로그인하기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>
          <Text style={styles.buttonHighlight}>Algo</Text> 시작하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="BinarySearch" component={BinarySearch} />
        <Stack.Screen name="CodeCompiler" component={CodeCompiler} />
        <Stack.Screen name="CodeGenerate" component={CodeGenerate} />
        <Stack.Screen name="Compiler" component={Compiler} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 350,
    height: 350,
  },
  description: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subDescription: {
    fontSize: 15,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 30,
  },
  highlight: {
    color: '#17b6c4',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderColor: '#17b6c4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 19,
  },
  buttonHighlight: {
    color: '#17b6c4',
  },
  googleButton: {
    marginTop: 20,
    width: 250,
  },
});

export default App;
