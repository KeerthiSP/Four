import _ from "lodash";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import Star from "./Star";

export default class AirbnbRating extends Component {
  static defaultProps = {
    defaultRating: 5,
    reviews: [],

    count: 5,
    onFinishRating: () =>
      console.log("Rating selected. Attach a function here."),
    showRating: true,
    size: 30,
    color: "red"
  };

  constructor() {
    super();

    this.state = {
      position: 5
    };
  }

  componentDidMount() {
    const { defaultRating } = this.props;

    this.setState({ position: defaultRating });
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => star);
  }

  starSelectedInPosition(position) {
    const { onFinishRating } = this.props;

    onFinishRating(position);

    this.setState({ position });
  }

  render() {
    const { position } = this.state;
    const { count, reviews, showRating } = this.props;
    const rating_array = [];

    _.times(count, index => {
      rating_array.push(
        <Star
          key={index}
          position={index + 1}
          starSelectedInPosition={this.starSelectedInPosition.bind(this)}
          fill={position >= index + 1}
          {...this.props}
        />
      );
    });

    return (
      <View style={styles.ratingContainer}>
        {showRating && (
          <Text style={styles.reviewText}>{reviews[position - 1]}</Text>
        )}
        <View style={styles.starContainer}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  reviewText: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 10,
    color: "rgba(0, 0, 0, 1)"
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
