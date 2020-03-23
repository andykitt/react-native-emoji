import React from 'react';
import {SafeAreaView} from 'react-native';
import {emojis} from '../google';
import FlatListContainer from '../components/FlatList';

const filteredEmojis = emojis.filter(e => e.category === 'People & Body');

const EmojiPicker = ({navigation}) => {
  return (
    <SafeAreaView style={{marginTop: 100}}>
      <FlatListContainer emojis={filteredEmojis} navigation={navigation} />
    </SafeAreaView>
  );
};

export default EmojiPicker;
