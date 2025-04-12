import {View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {navigate} from '../../utils/NavigationUtils';
import LinearGradient from 'react-native-linear-gradient';

const Search = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationType, setLocationType] = useState<'from' | 'to'>('from');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handelLocationSet = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(location);
      if (location === to) {
        setTo(null);
      }
    } else {
      setTo(location);
    }
  };

  const handelSearchBuses = () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Imformation',
        'Please select both departure and destination locations.',
      );
      return;
    }
    if (from === to) {
      Alert.alert(
        'Invalid Selection',
        'Departure and destination locations cannot be the same.',
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      Alert.alert(
        'Invalid Date',
        'Please select a future date for your journey.',
      );
      return;
    }

    navigate('BusListScreen', {item: {from, to, date}});
  };

  return (
    <View className="rounded-b-3xl overflow-hidden ">
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}>
        <View className="p-4">
          <View className="my-4 border-1 z-20 bg-white rounded-md border-gray-600">
            <TouchableOpacity
              className="p-4 flex-row gap-4 items-center"
              onPress={() => {
                setLocationType('from');
                setShowDatePicker(true);
              }}>
              <Image
                source={require('../../assets/images/bus.png')}
                className="h-6 w-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {from || 'From'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 border-t-[1px] border-b-[1px] rounded-md border-gray-400 flex-row gap-4 items-center"
              onPress={() => {
                setLocationType('to');
                setShowDatePicker(true);
              }}>
              <Image
                source={require('../../assets/images/bus.png')}
                className="h-6 w-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || 'To'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Search;
