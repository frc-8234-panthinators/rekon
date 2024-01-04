import MathJax from "react-native-mathjax";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { parse, evaluate } from "mathjs";
import Colors from '../../../colors';
const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
        ],
        displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
        ],
        processEscapes: true,
    },
    TeX: {
        extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "noErrors.js",
        "noUndefined.js",
        ],
    },
};

export default function MathJaxComponent(props) {
    const [math, setMath] = useState(props.math);
    const [result, setResult] = useState('undefined');

    useEffect(() => {
        try {
            const parsed_jax = parse(props.math).toTex({parenthesis: "auto", implicit: "hide"});
            setMath(`$${parsed_jax}$`);
            const result = evaluate(props.math);
            setResult(result);
        } catch (error) {
            setMath(`$${props.math}$`);
        }
    }, [props.math]);

    console.log('test');
    
    return (
        <View style={styles.container}>
            <MathJax
                mathJaxOptions={mmlOptions}
                html={math}
            />
            {result !== undefined &&
                <Text style={{color: Colors.text, fontSize: 36}}>Result: {result.toString()}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        width: '90%',
        height: 220,
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
    }
});