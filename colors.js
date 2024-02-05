import React, { createContext, useContext, useEffect, useState } from 'react';
import tinycolor from "tinycolor2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ColorContext = createContext();

export const useColors = () => useContext(ColorContext);

//Subtraction table
/*let hslDiffTable = {
    secondaryContainer: [0, -20, 10],
    secondary: [-1, -33, -38],
    tabSelected: [0, -32, -45],
    border: [0, -20, 10],
    graphPrimary: [0, -20, 10],
    secondaryText: [0, -20, 10],
    accent: [0, 0, 0],
    secondaryDim: [0, -20, 10, -0.5],
    secondaryBright: [0, -32, -23]
}*/

//Multiplication table
let hslDiffTable = {
    secondaryContainer: [1, 0.666, 1.172],
    border: [1, 0.666, 1.172],
    graphPrimary: [1, 0.666, 1.172],
    secondaryText: [1, 0.666, 1.172],
    secondaryDim: [1, 0.666, 1.172, -0.5],
    secondary: [0.99, 0.45, 0.34],
    tabSelected: [1, 0.466, 0.224],
    accent: [1, 1, 1],
    secondaryBright: [0.99, 0.46, 0.60]
}

const defaultColors = {
    primary: '#000000',
    errorBackground: '#c73737',
    secondary: '#312541',
    secondaryBright: '#574174',
    secondaryDim: '#aa8dce7c',
    secondaryContainer: '#AA8DCE',
    accent: '#3E4758',  
    imageHeader: '#1a1b1ece',
    text: '#e3e2e6',
    secondaryText: '#AA8DCE',
    textDim: '#8E9099',
    header: '#BDC7DC',
    border: '#AA8DCE',
    tabIcons: '#e3e2e6',
    onAccent: '#e3e2e6',
    tabSelected: '#1F1729',
    graphPrimary: '#AA8DCE',
    accent: '#8D53D4'
}

export const ColorProvider = ({ children }) => {
    const [Colors, setColors] = useState(defaultColors);

    //color bootstrapping
    async function loadColors() {
        try {
            const storedColors = await AsyncStorage.getItem('colors');
            const loadedColors = storedColors ? JSON.parse(storedColors) : defaultColors;
            setColors(loadedColors);
        } catch (error) {
            console.error('Error loading colors from AsyncStorage:', error);
        }
    }

    useEffect(() => {
        loadColors();
    }, []);

    function calcDiffFromTable(accent) {  
        let newColors = {};
        for (let color in hslDiffTable) {
            let diff = hslDiffTable[color];
            let accentHSL = tinycolor(accent).toHsl();
            accentHSL.h *= diff[0];
            accentHSL.s *= diff[1];
            accentHSL.l *= diff[2];
            if (diff.length > 3) {
                accentHSL.a += diff[3];
                }
                // Ensure the HSL values stay within the valid range
            accentHSL.h = Math.max(0, Math.min(360, accentHSL.h));
            accentHSL.s = Math.max(0, Math.min(1, accentHSL.s));
            accentHSL.l = Math.max(0, Math.min(1, accentHSL.l));
            if (diff.length > 3) {
                accentHSL.a = Math.max(0, Math.min(1, accentHSL.a));
            }
            newColors[color] = tinycolor(accentHSL).toHexString() + (diff.length > 3 ? Math.round(accentHSL.a * 255).toString(16) : '');
        }
        
        if (tinycolor.readability(accent, defaultColors.onAccent) < 4.5) {
            let accentHSL = tinycolor(accent).toHsl();
            // generate array of potential colors
            // this is a very unoptimized way to do this, but it shouldn't need to be run often
            let possibleColors = [];

            for (let l = 0; l <= 100; l += 5) {
                for (let s = 0; s <= 100; s += 5) {
                    possibleColors.push(tinycolor({ h: accentHSL.h, s, l }).toHexString());
                }
            }

            // filter out colors that don't meet the minimum contrast ratio
            possibleColors = possibleColors.filter(color => tinycolor.readability(accent, color) >= 4.5);

            // find the most readable color
            newColors.onAccent = tinycolor.mostReadable(accent, possibleColors).toHexString();
        } else {
            newColors.onAccent = defaultColors.onAccent;
        }
        
        return newColors;
    }

    function updateColorsFromCalc(newColors) {
        setColors(prevColors => {
            const updatedColors = { ...prevColors };
            for (const color in newColors) {
                if (updatedColors[color] !== newColors[color]) {
                    updatedColors[color] = newColors[color];
                }
            }
            AsyncStorage.setItem('colors', JSON.stringify(updatedColors));
            return updatedColors;
        });
    }

    function resetColorsToDefault() {
        setColors(defaultColors);
        AsyncStorage.setItem('colors', JSON.stringify(defaultColors));
    }

    return (
        <ColorContext.Provider value={{ Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault }}>
          {children}
        </ColorContext.Provider>
    );
}

//accent: '#24D191' seafoam green
//accent: '#b7e4c7' mint green