import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import {getAccessToken, getRefreshToken} from '../service/storage';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {refresh_token} from '../service/requests/auth';

interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const tokenCheck = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (accessToken) {
        if (!refreshToken) {
          Alert.alert('Session Expired', 'Please login again', [
            {text: 'OK', onPress: () => resetAndNavigate('LoginScreen')},
          ]);
          return;
        }

        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

        const currentTime = Date.now() / 1000;

        if (decodedRefreshToken.exp < currentTime) {
          Alert.alert('Session Expired', 'Please login again', [
            {text: 'OK', onPress: () => resetAndNavigate('LoginScreen')},
          ]);
          return;
        }

        if (decodedAccessToken.exp < currentTime) {
          const refreshed = await refresh_token();
          if (!refreshed) {
            Alert.alert('Error', 'Failed to refresh session', [
              {text: 'OK', onPress: () => resetAndNavigate('LoginScreen')},
            ]);
            return;
          }
        }

        resetAndNavigate('HomeScreen');
        return;
      }

      resetAndNavigate('LoginScreen');
    } catch (error) {
      console.error('Token check error:', error);
      Alert.alert('Error', 'An error occurred. Please login again.', [
        {text: 'OK', onPress: () => resetAndNavigate('LoginScreen')},
      ]);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        tokenCheck();
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View className="flex-1 justify-center bg-white items-center">
      <Image
        source={require('../assets/images/logo_t.png')}
        className="h-[30%] w-[60%]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;