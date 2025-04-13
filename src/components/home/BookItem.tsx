import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'

const BookItem = ({item}: any) => {
  const [ticketVisible,setTicketVisible] = useState(false)

  return (
    <View className='bg-gray-100 p-4 rounded-lg mb-3'>
      <View className='flex-row justify-between '>
        <Image 
        source={require('../../assets/images/sidebus.png')}
        className='h-6 w-8'
        />
        <Text className='text-gray-500'>{item?.status}</Text>
      </View>
      <Text className='text-lg font-bold'>
        {item?.bus.from} → {item?.bus?.to}
      </Text>
      <Text className='text-gray-600'>{new Date(item?.date)?.toDateString()}</Text>
      <Text className='text-gray-600'>{item?.bus?.type}</Text>
    </View>
  )
}

export default BookItem