import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "FormCont": {
        "width": "100%",
        "height": "100%",
        "maxHeight": 600,
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "paddingTop": 100
    },
    "LoginForm": {
        "width": "40%",
        "border": "1px solid #ddd",
        "borderRadius": 5,
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20
    },
    "Form-Bottom": {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-around",
        "alignItems": "center"
    }
});