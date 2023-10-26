// Copyright StarlightX 2023. 
// This code can be governed by the General Public License v3 or the StarlightX Public License, at your discretion.
// For more details, read here: https://starlightx.io/licenses

// External Imports
import React from 'react';

interface TypingEffectProps {
    text: string;
    tailwind?: string;
    finish?: Function;
    textAnim: string;
    textdelay: number;
}

export const TypingEffect = ( props:TypingEffectProps ) => {
  const [displayText, setDisplayText] = React.useState<string[]>([]);

  React.useEffect(() => {
    let currentIndex = 0;
    let timer: number;
    setDisplayText([]);

    const typeNextCharacter = () => {
        let Current_String = "";

        // Append word 
        while (currentIndex < props.text.length) {
            Current_String += props.text[currentIndex];
            if(props.text[currentIndex] === ' ') {currentIndex++; break;}
            currentIndex++;
        }

        // Add it to array
        if (currentIndex < props.text.length) {

            setDisplayText((prevDisplayText) => [...prevDisplayText, Current_String]);
            timer = setTimeout(typeNextCharacter, props.textdelay);

        } else {
            setDisplayText((prevDisplayText) => [...prevDisplayText, Current_String]);
            
        }
    };

    typeNextCharacter();

    return () => {
      clearTimeout(timer);
    };
  },[]);

  // Return map with all the values
  return <div className={props.tailwind}>
    {displayText.map((text, index) => (
            <span key={index} className = {props.textAnim} >{text}</span>
        ) )}
  </div>;
};

export default TypingEffect;
