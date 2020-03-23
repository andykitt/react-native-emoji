import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Image from '../components/Image';
import {emojis} from '../google';
import FlatListContainer from '../components/FlatList';

const {width} = Dimensions.get('window');

const EmojiPicker = ({navigation}) => {
  const [tones, setTones] = useState();
  const [height] = useState(new Animated.Value(0));

  const onSelect = emoji => {
    if (emoji.skin_variations) {
      setTones(emoji.images);
      showBox();
    } else {
      navigation.navigate('Home');
      setTones([]);
    }
  };

  const hideBox = () => {
    Animated.timing(height, {
      toValue: 0,
    }).start();
  };

  const showBox = () => {
    Animated.timing(height, {
      toValue: 100,
    }).start();
  };

  const handleScroll = () => {
    hideBox();
  };

  return (
    <SafeAreaView>
      <Animated.View style={[styles.skinEmojiWrapper, {height: height}]}>
        {tones?.slice(0, 6).map((image, i) => (
          <TouchableOpacity key={i} onPress={() => onSelect(image)}>
            <View style={styles.emojiWrapper}>
              <Image source={image} style={styles.imageStyle} />
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <FlatListContainer
        emojis={emojis}
        onSelect={onSelect}
        handleScroll={handleScroll}
      />
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
    position: 'absolute',
    top: 0,
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
