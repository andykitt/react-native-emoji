// @flow
import * as React from 'react';
import FastImage from 'react-native-fast-image';

type Props = {
  source?: {
    uri?: string,
    headers?: object,
    priority?:
      | FastImage.priority.low
      | FastImage.priority.normal
      | FastImage.priority.high,
    cache?:
      | FastImage.cacheControl.immutable
      | FastImage.cacheControl.web
      | FastImage.cacheControl.cacheOnly,
  },
  resizeMode?:
    | FastImage.resizeMode.contain
    | FastImage.resizeMode.cover
    | FastImage.resizeMode.stretch
    | FastImage.resizeMode.center,
  onLoadStart?: Function,
  onProgress?: Function,
  onLoad?: Function,
  onError?: Function,
  onLoadEnd?: Function,
  fallback: boolean,
};

const Image = (props: Props): React.Node => <FastImage {...props} />;

export default Image;
