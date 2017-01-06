import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "navBar" {
    "position": "relative";
    "display": "flex";
    "flex-direction": "row";
    "padding": "0.5rem 1rem";
  }
  // "navBar-nav" {
  //   display: flex;
  //   flex-direction: row;
  //   -webkit-box-orient: vertical;
  //   -webkit-box-direction: normal;
  //   padding-left: 0;
  //   margin-bottom: 0;
  //   list-style: none;
  // }
  // "navLink" {
  //   display: block;
  //   padding: 0.5em 1em;
  //   margin: 0 1em;
  // }
})
