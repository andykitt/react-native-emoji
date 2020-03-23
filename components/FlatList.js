import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  InteractionManager,
  Dimensions,
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

  renderItem = item => <Emoji emoji={item} onSelect={this.props.onSelect} />;

  render() {
    const {emojis, handleScroll} = this.props;
    return (
      <>
        <FlatList
          keyExtractor={item => item.unified}
          data={emojis}
          numColumns={6}
          windowSize={3}
          getItemLayout={(data, index) => ({
            length: 60,
            offset: (width / 6) * index,
            index,
          })}
          onScrollBeginDrag={handleScroll}
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20,
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
