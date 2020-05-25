export function sumHexColor(hexColor, increment) {
    let hexRed = hexColor.slice(1, 3);
    let hexGreen = hexColor.slice(3, 5);
    let hexBlue = hexColor.slice(5, 7);

    let red = keepRangeColor(parseInt(hexRed, 16) + increment);
    let green = keepRangeColor(parseInt(hexGreen, 16) + increment);
    let blue = keepRangeColor(parseInt(hexBlue, 16) + increment);

    return "#" + red + green + blue;
}

function keepRangeColor(value, minValue = 0, maxValue = 255) {
    let newValue = Math.max(minValue, Math.min(maxValue, value));
    let hexNewValue = (newValue).toString(16);

    if(hexNewValue.length === 1) {
        hexNewValue = "0" + hexNewValue;
    }

    return hexNewValue;
}