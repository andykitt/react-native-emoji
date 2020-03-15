/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image as RNImage,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Image from './Image';
import FastImage from 'react-native-fast-image';
// import emojis from 'emoji-datasource-google';
import {emojis} from './google.js';
// import helof from './node_modules/emoji-datasource-google/img/google/64/';

const {width, height} = Dimensions.get('window');

const App: () => React$Node = () => {
  const [tones, setTones] = useState();
  const [opacity, setOpacity] = useState(0);

  const filteredEmojis = emojis.filter(
    e =>
      e.category === 'People & Body' ||
      e.category === 'Activities' ||
      e.category === 'Smileys & Emotion',
  );

  useEffect(() => {
    setTimeout(() => setOpacity(1), 500);
  }, []);

  useEffect(() => {
    const uris = filteredEmojis.map(emoji => {
      if (emoji.images.length > 1) {
        return emoji.images.map(image => ({
          uri: RNImage.resolveAssetSource(image).uri,
        }));
      }
    });

    console.log(uris);
  }, []);

  function unifiedToNative(unified) {
    var unicodes = unified.split('-'),
      codePoints = unicodes.map(u => `0x${u}`);

    return String.fromCodePoint.apply(null, codePoints);
  }

  const onSelect = emoji => {
    if (emoji.skin_variations) {
      setTones(emoji.images);
    } else {
      alert('selected');
      setTones([]);
    }
  };

  const Emoji = ({emoji}) => {
    return (
      <TouchableOpacity
        style={{width: width / 6}}
        onPress={() => onSelect(emoji)}>
        <View style={styles.emojiWrapper}>
          <Image
            source={emoji.images[0]}
            style={styles.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
          {emoji.skin_variations && (
            <Text style={{fontSize: 30, position: 'absolute'}}>.</Text>
          )}
        </View>
      </TouchableOpacity>
    );
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
      <FlatList
        // removeClippedSubviews={true} // Unmount components when outside of window
        // initialNumToRender={85} // Reduce initial render amount
        // maxToRenderPerBatch={1} // Reduce number in each render batch
        // updateCellsBatchingPeriod={5} // Increase time between renders
        // windowSize={7}
        keyExtractor={item => item.unified}
        data={filteredEmojis}
        numColumns={6}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 20,
          opacity: opacity,
        }}
        removeClippedSubviews
        horizontal={false}
        renderItem={({item}) => <Emoji emoji={item} />}
      />
      {!opacity && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 300,
    position: 'absolute',
    left: 50,
    top: 50,
  },
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
  skinEmoji: {
    padding: 15,
    fontSize: 30,
  },
});

export default App;
