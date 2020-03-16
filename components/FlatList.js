import React from 'react';
import {FlatList} from 'react-native';
import Emoji from './Emoji';

class FlatListContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== 'hello';
  }

  renderItem = item => <Emoji emoji={item} onSelect={this.props.onSelect} />;

  render() {
    const {emojis} = this.props;
    return (
      <FlatList
        keyExtractor={item => item.unified}
        data={emojis}
        numColumns={6}
        windowSize={6}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 20,
        }}
        removeClippedSubviews
        horizontal={false}
        renderItem={({item}) => this.renderItem(item)}
      />
    );
  }
}

export default FlatListContainer;
