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
    },
    "product_img": {
        "width": "30%",
        "maxWidth": 120
    },
    "listCard": {
        "width": 200,
        "height": 150,
        "border": "1px solid #ddd",
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5
    },
    "orderList": {
        "display": "flex",
        "flexDirection": "row",
        "paddingTop": 1,
        "paddingRight": 0,
        "paddingBottom": 1,
        "paddingLeft": 0,
        "width": "100%",
        "height": "30%",
        "maxHeight": 280,
        "borderTop": "1px solid #ddd",
        "borderBottom": "1px solid #ddd",
        "marginBottom": 1
    }
});