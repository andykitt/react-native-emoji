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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.emoji.name === 'SQUARED OK') {
      console.log(nextProps.emoji != this.props.emoji);
    }
    return nextProps.emoji != this.props.emoji;
  }
  render() {
    const {emoji, onSelect} = this.props;
    return (
      <TouchableOpacity
        style={{width: width / 6}}
        onPress={() => onSelect(emoji)}>
        <View style={styles.emojiWrapper}>
          <Image source={emoji.images[0]} style={styles.imageStyle} />
          {emoji.skin_variations && (
            <Text style={{fontSize: 30, position: 'absolute'}}>.</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

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
});

export default Emoji;
