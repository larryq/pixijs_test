
import React from 'react'
import * as PIXI from 'pixi.js'

import { Stage, Text } from  '@inlet/react-pixi';
const { useState, useMemo, useRef, useEffect, useCallback } = React;

const width = 500;
const height = 550;


const style = new PIXI.TextStyle({
  align: "center",
  fontFamily: "sans-serif",
  fontSize: 60,
  fontWeight: "bold",
  fill: ["#26f7a3", "#01d27e"],
  stroke: "#eef1f5",
  strokeThickness: 1,
  letterSpacing: 5,
  wordWrap: true,
  wordWrapWidth: 350
});

const Message = ({ poem: msg, interval = 0, children }) => {
  const poemChars = () => msg.split("").concat([...Array(10)].map(() => ''));
  const [state, setState] = useState({ text: '', rest: poemChars() })
  
  useEffect(() => {
    const update = () => {
      setState(({ text, rest }) => { 
        if (rest.length === 0) {
          return { text: '', rest: poemChars() }
        }
        const line = text + rest.shift();
        return { text: line, rest }
      })
    }
    
    const i = setInterval(update, interval);
    return () => {
      clearInterval(i)
    };
  }, );

  return children(state.text);
};

export default () => (
  <Stage width={width} height={height} options={{ autoDensity: true, backgroundColor: 0xeef1f5 }}>
    <Message poem='This is Bohemian Rhapsody' interval={1000 / 10}>
      {(text) => (
        <Text
          text={text}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
          style={style}
        />
      )}
    </Message>
  </Stage>
);

//ReactDOM.render(<App />, document.body);

