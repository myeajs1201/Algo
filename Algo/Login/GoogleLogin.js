import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  webClientId: '231449376818-1a2asp5jbc41rc31a3jn7bspncra49b8.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
  accountName: '',
});

// GoogleLogin.js 파일

export const signIn = async (navigation) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo); // 로그인 성공 후 사용자 정보 출력
    navigation.navigate('Content'); // 로그인 성공 시 Content 스크린으로 이동
  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
  }
};


export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
