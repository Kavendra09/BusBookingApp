import axios from 'axios';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import apiClient from '../apiClent';
import {BASE_URL} from '../config';
import {
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
  renoveRefreshToken,
  getRefreshToken,
} from '../storage';

export const loginWithGoogle = async (idToken: string) => {
  const {data} = await apiClient.post('/user/login', {id_token: idToken});

  setAccessToken(data?.accessToken);
  setRefreshToken(data?.refreshToken);
  
  return data?.user;
};

export const logout = async () => {
  removeAccessToken();
  renoveRefreshToken();
  resetAndNavigate('LoginScreen');
};

export const refresh_token = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    console.log(refreshToken);
    

    if (!refreshToken) {
      throw new Error(' No refresh token is found');
    }

    const {data} = await axios.post(`${BASE_URL}/user/refresh`, {
      refreshToken,
    });

    if(data?.accessToken){
        setAccessToken(data?.accessToken)
        return true
    } else {
        throw new Error("Invalid Refresh Token")
    }

  } catch (error) {
    console.error('token refresh failed: ', error);
    logout();
    return false;
  }
};
