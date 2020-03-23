import React from 'react';
import {
  FlatList,
  Dimensions,
  InteractionManager,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Emoji from './Emoji';

const {width} = Dimensions.get('window');

class FlatListContainer extends React.Component {
  state = {
    opacity: 0,
  };
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({opacity: 1});
    });
  }

  renderItem = item => (
    <Emoji
      emoji={item}
      onSelect={this.props.onSelect}
      navigation={this.props.navigation}
    />
  );

  render() {
    const {emojis} = this.props;
    return (
      <>
        <FlatList
          keyExtractor={item => item.unified}
          data={emojis}
          numColumns={6}
          removeClippedSubviews
          windowSize={2}
          getItemLayout={(data, index) => ({
            length: 60,
            offset: (width / 6) * index,
            index,
          })}
          windowSize={6}
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            opacity: this.state.opacity,
            zIndex: 1,
          }}
          removeClippedSubviews
          horizontal={false}
          renderItem={({item}) => this.renderItem(item)}
        />
        {!this.state.opacity && <ActivityIndicator />}
      </>
    );
  }
}

export default FlatListContainer;
