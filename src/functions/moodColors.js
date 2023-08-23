import tinycolor from "tinycolor2";

const colors = [
    { mood: -100, color: '#52398E' },
    { mood: -75, color: '#4660D7' },
    { mood: -50, color: '#5288DA' },
    { mood: 0, color: '#8EC5DC' },
    { mood: 50, color: '#A7D970' },
    { mood: 75, color: '#EBBE41' },
    { mood: 100, color: '#EE8E5B' },
]

function getPrimaryColor(mood) {
    let lowerBound = null;
    let upperBound = null;

    for (let i = 0; i < colors.length - 1; i++) {
        if (mood >= colors[i].mood && mood <= colors[i + 1].mood) {
            lowerBound = colors[i];
            upperBound = colors[i + 1];
            break;
        }
    }

    if (!lowerBound || !upperBound) return getPrimaryColor(0);

    const range = upperBound.mood - lowerBound.mood;
    const differenceFromLower = mood - lowerBound.mood;
    const mixPercentage = (differenceFromLower / range) * 100;

    return tinycolor.mix(lowerBound.color, upperBound.color, mixPercentage).toHexString();
}

function getSecondaryColor(primary) {
    const hsl = tinycolor(primary).toHsl();
    hsl.s = 0.4;
    hsl.l = 0.8;

    return tinycolor(hsl).toHexString();
}

function getBackgroundPrimaryColor(primary) {
    const hsl = tinycolor(primary).toHsl();
    hsl.s = 0.2;
    hsl.l = 0.6;

    return tinycolor(hsl).toHexString();
}

function getBackgroundSecondaryColor(primary) {
    const hsl = tinycolor(primary).toHsl();
    hsl.s = 0.2;
    hsl.l = 0.9;

    return tinycolor(hsl).toHexString();
}

export default function getColors(mood) {
    const primary = getPrimaryColor(mood);

    return ({
        primary,
        secondary: getSecondaryColor(primary),
        backgroundPrimary: getBackgroundPrimaryColor(primary),
        backgroundSecondary: getBackgroundSecondaryColor(primary),
    });
}