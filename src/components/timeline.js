import React, {useRef} from 'react';
import {
  Image,
  View,
  ViewPropTypes,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

// import Icon from 'react-native-vector-icons/FontAwesome';

const TIMESIZE = {
  WIDTH: 50,
  HEIGHT: 30,
};
const DEFAULTDOTCOLOR = 'white';

Timeline.defaultProps = {
  // timelineDirection: 'column',
  // timelineFormat: 'time-show-forward',
  // compactness: 20,
  // timelineItemHeight: 50,
  timelineDirection: 'row',
  timelineFormat: 'time-show-forward',
  compactness: 1,
  timelineItemWidth: 150,
  circleSize: 18,
  circleColor: 'white',
  lineWidth: 1,
  showSeparator: false,
  innerCircle: 'dot',
  icon: 'hand-stop-o',
  iconColor: 'white',
  datasource: [],
};

Timeline.propTypes = {
  datasource: PropTypes.array,
  timelineStyle: ViewPropTypes.style,
  timelineDirection: PropTypes.oneOf(['row', 'column']),
  timelineFormat: PropTypes.oneOf(['time-show-forward', 'time-show-afterward']),
  rowContainerStyle: ViewPropTypes.style,
  timeContainerStyle: ViewPropTypes.style,
  timeStyle: ViewPropTypes.style,
  circleSize: PropTypes.number,
  circleColor: PropTypes.string,
  lineWidth: PropTypes.number,
  innerCircle: PropTypes.string,
  showSeparator: PropTypes.bool,
  renderChildren: PropTypes.func,
  onEventPress: PropTypes.func,
  compactness: PropTypes.number,
  timelineItemWidth: PropTypes.number,
  timelineItemHeight: PropTypes.number,
};

const styles = {
  column: StyleSheet.create({
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeContainer: {
      // minWidth: TIMEWIDTH,
      width: TIMESIZE.WIDTH,
    },
    separator: {
      height: 1,
      backgroundColor: '#aaa',
      marginTop: 10,
      marginBottom: 10,
    },
  }),
  row: StyleSheet.create({
    rowContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    timeContainer: {
      // minWidth: TIMEWIDTH,
      height: TIMESIZE.HEIGHT,
    },
    separator: {
      width: 1,
      backgroundColor: 'red',
      marginLeft: 1,
      marginRight: 1,
    },
  }),

  'time-show-forward': StyleSheet.create({
    timeWrapper: {
      alignItems: 'flex-end',
    },
  }),
  'time-show-afterward': StyleSheet.create({
    timeWrapper: {
      alignItems: 'flex-start',
    },
  }),

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    minHeight: 100,
    minWidth: 100,
  },
  time: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    padding: 0,
    borderRadius: 13,
    overflow: 'hidden',
    minWidth: 46.5,
    fontWeight: 'bold',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
};

export default function Timeline(props) {
  const {datasource} = props;
  const _margin = props.compactness ? props.compactness : 10;
  const refContainer = useRef(null);

  const getItemLayout = (data, index) => {
    let itemLength =
      props.timelineDirection === 'row' ? props.itemWidth : props.itemHeight;
    return {length: itemLength, offset: itemLength * index, index};
  };

  const scrollToIndex = options => {
    refContainer.flatListRef.scrollToIndex(options);
  };

  const scrollToEnd = options => {
    refContainer.flatListRef.scrollToEnd(options);
  };

  const scrollToOffset = options => {
    refContainer.flatListRef.scrollToOffset(options);
  };

  const _renderTime = (item, index) => {
    return (
      <View
        key={`time_${index}`}
        style={[
          styles[props.timelineFormat].timeWrapper,
          styles[props.timelineDirection].timeContainer,
          props.timeContainerStyle,
        ]}>
        <Text style={[styles.time, props.timeStyle]}>{item.time}</Text>
      </View>
    );
  };

  const _renderChild = (item, index) => {
    let lineWidth = item.lineWidth ? item.lineWidth : props.lineWidth;
    let isLast = props.datasource[props.datasource.length - 1] === item;
    let lineColor = item.lineColor ? item.lineColor : props.lineColor;

    var opStyle = null;
    switch (props.timelineDirection) {
      case 'column':
        switch (props.timelineFormat) {
          case 'time-show-forward':
            opStyle = {
              borderColor: lineColor,
              borderLeftWidth: lineWidth,
              borderRightWidth: 0,
              marginLeft: _margin,
              paddingLeft: _margin,
              height: item.itemHeight
                ? item.itemHeight
                : props.timelineItemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            };
            break;
          case 'time-show-afterward':
            opStyle = {
              borderColor: lineColor,
              borderLeftWidth: 0,
              borderRightWidth: lineWidth,
              marginRight: _margin,
              paddingRight: _margin,
              height: item.itemHeight
                ? item.itemHeight
                : props.timelineItemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            };
            break;
        }
        break;
      case 'row':
        switch (props.timelineFormat) {
          case 'time-show-forward':
            opStyle = {
              borderColor: lineColor,
              borderTopWidth: lineWidth,
              borderBottomWidth: 0,
              marginTop: _margin,
              paddingTop: _margin,
              width: item.itemWidth ? item.itemWidth : props.timelineItemWidth,
              justifyContent: 'center',
              alignItems: 'center',
            };
            break;
          case 'time-show-afterward':
            opStyle = {
              borderColor: lineColor,
              borderTopWidth: 0,
              borderBottomWidth: lineWidth,
              marginBottom: _margin,
              paddingBottom: _margin,
              width: item.itemWidth ? item.itemWidth : props.timelineItemWidth,
              justifyContent: 'center',
              alignItems: 'center',
            };
            break;
        }
        break;
    }

    // _renderSeparator not show in 'row'
    return (
      <View style={opStyle}>
        <TouchableOpacity
          disabled={props.onEventPress == null}
          onPress={() =>
            props.onEventPress ? props.onEventPress(item) : null
          }>
          <View>{props.renderChildren(item, index)}</View>
          {props.timelineDirection === 'column'
            ? isLast
              ? null
              : _renderSeparator()
            : null}
        </TouchableOpacity>
      </View>
    );
  };

  const _renderCircle = (item, index) => {
    var circleSize = item.circleSize ? item.circleSize : props.circleSize;
    var circleColor = item.circleColor ? item.circleColor : props.circleColor;
    var lineWidth = item.lineWidth ? item.lineWidth : props.lineWidth;

    var circleStyle = null;
    switch (props.timelineDirection) {
      case 'column':
        switch (props.timelineFormat) {
          case 'time-show-forward':
            circleStyle = {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              left:
                TIMESIZE.WIDTH + _margin - circleSize / 2 + (lineWidth - 1) / 2,
            };
            break;
          case 'time-show-afterward':
            circleStyle = {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              right:
                TIMESIZE.WIDTH + _margin - circleSize / 2 + (lineWidth - 1) / 2,
            };
            break;
        }
        break;
      case 'row':
        switch (props.timelineFormat) {
          case 'time-show-forward':
            circleStyle = {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              top:
                TIMESIZE.HEIGHT +
                _margin -
                circleSize / 2 +
                (lineWidth - 1) / 2,
            };
            break;
          case 'time-show-afterward':
            circleStyle = {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              bottom:
                TIMESIZE.HEIGHT +
                _margin -
                circleSize / 2 +
                (lineWidth - 1) / 2,
            };
            break;
        }
        break;
    }

    var innerCircle = null;
    switch (props.innerCircle) {
      case 'dot':
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: item.dotColor
            ? item.dotColor
            : props.dotColor
            ? props.dotColor
            : DEFAULTDOTCOLOR,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      //   case 'icon':
      //     let iconSource = item.icon ? item.icon : props.icon;
      //     let iconColor = item.iconColor ? item.iconColor : props.iconColor;
      //     innerCircle = (
      //       <Icon
      //         name={iconSource}
      //         size={circleSize - 2}
      //         color={iconColor}
      //         style={{backgroundColor: 'transparent'}}
      //       />
      //     );
      //     break;
      case 'pic':
        let picSource = item.pic ? item.pic : props.pic;
        let picStyle = {
          height: circleSize - 2,
          width: circleSize - 2,
        };
        innerCircle = (
          <Image source={picSource} style={[picStyle, props.picStyle]} />
        );
        break;
    }
    return (
      <View
        style={[styles.circle, circleStyle, props.circleStyle]}
        key={`c_${index}`}>
        {innerCircle}
      </View>
    );
  };

  const _renderSeparator = () => {
    if (props.showSeparator) {
      return (
        <View
          style={[
            styles[props.timelineDirection].separator,
            props.separatorStyle,
          ]}
        />
      );
    } else {
      return null;
    }
  };

  const _renderItem = (item, index) => {
    let content = null;
    const key = `item_${index}`;
    switch (props.timelineFormat) {
      case 'time-show-forward':
        content = (
          <View
            key={key}
            style={[
              styles[props.timelineDirection].rowContainer,
              props.rowContainerStyle,
              {justifyContent: 'flex-start', maxWidth: 84},
            ]}>
            {_renderTime(item, index)}
            {_renderChild(item, index)}
            {_renderCircle(item, index)}
          </View>
        );
        break;
      case 'time-show-afterward':
        content = (
          <View
            key={key}
            style={[
              styles[props.timelineDirection].rowContainer,
              props.rowContainerStyle,
              {justifyContent: 'flex-end', maxWidth: 84},
            ]}>
            {_renderChild(item, index)}
            {_renderTime(item, index)}
            {_renderCircle(item, index)}
          </View>
        );
        break;
    }
    return content;
  };

  return (
    <View style={[styles.container, props.timelineStyle]}>
      <FlatList
        ref={refContainer}
        style={[styles.flatlist]}
        data={datasource}
        horizontal={props.timelineDirection !== 'row' ? false : true}
        renderItem={({item, index}) => _renderItem(item, index)}
        keyExtractor={item => item.time}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
