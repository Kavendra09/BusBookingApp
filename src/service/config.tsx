import { Platform } from "react-native";

export const BASE_URL = 
Platform.OS === 'android' ? 'http://localhost:4000' : 'http://localhost:4000'