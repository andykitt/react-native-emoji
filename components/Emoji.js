import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import Image from './Image';

const {width} = Dimensions.get('window');

class Emoji extends React.Component {
  state = {
    tones: [],
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.emoji.name === 'SQUARED OK') {
  //     console.log(nextProps.emoji != this.props.emoji);
  //   }
  //   return nextProps.emoji != this.props.emoji;
  // }

  onSelect = emoji => {
    if (emoji.skin_variations) {
      this.setState({tones: emoji.images});
    } else {
      this.props.navigation.navigate('Home');
      this.setState({tones: []});
    }
  };

  render() {
    const {emoji, onSelect} = this.props;
    const {tones} = this.state;
    return (
      <View>
        {tones && Boolean(tones.length) && (
          <View style={[styles.skinEmojiWrapper, {zIndex: 100}]}>
            {tones.slice(0, 6).map((image, i) => (
              <TouchableOpacity key={i} onPress={() => this.onSelect(image)}>
                <View style={styles.emojiWrapper}>
                  <Image source={image} style={styles.imageStyle} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={{width: width / 6}}
          onPress={() => this.onSelect(emoji)}>
          <View style={styles.emojiWrapper}>
            <Image source={emoji.images[0]} style={styles.imageStyle} />
            {emoji.skin_variations && (
              <Text style={{fontSize: 30, position: 'absolute', bottom: 0}}>
                .
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    position: 'absolute',
    width: 32,
    height: 32,
    zIndex: -1,
  },
  emojiWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    zIndex: 1,
  },
  skinEmojiWrapper: {
    width: width,
    position: 'absolute',
    top: -32,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    alignItems: 'center',
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
    zIndex: 100,
  },
});

export default Emoji;
