import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Image from '../components/Image';
import {emojis} from '../google';
import FlatListContainer from '../components/FlatList';

const {width} = Dimensions.get('window');

const EmojiPicker = () => {
  const [tones, setTones] = useState();

  const onSelect = emoji => {
    if (emoji.skin_variations) {
      setTones(emoji.images);
    } else {
      console.log('hello');
      setTones([]);
    }
  };

  return (
    <SafeAreaView>
      {tones && Boolean(tones.length) && (
        <View style={styles.skinEmojiWrapper}>
          {tones.slice(0, 6).map((image, i) => (
            <TouchableOpacity key={i} onPress={() => onSelect(image)}>
              <View style={styles.emojiWrapper}>
                <Image source={image} style={styles.imageStyle} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <FlatListContainer emojis={emojis} onSelect={onSelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
  emojiWrapper: {
    position: 'relative',
    padding: 30,
  },
  skinEmojiWrapper: {
    width: width,
    height: 100,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 1000,
  },
});

export default EmojiPicker;
