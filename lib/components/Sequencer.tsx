// Copyright StarlightX 2023. 
// This code can be governed by the General Public License v3 or the StarlightX Public License, at your discretion.
// For more details, read here: https://starlightx.io/licenses

import React, { useEffect, useState } from "react";

interface SequencerProps {
  objects: React.ReactElement<any>[];
  tailwind: string;
  id?: string;
}

export const Sequencer = (props: SequencerProps) => {
    const [sendObjects, setSendObjects] = useState<React.ReactElement<any>[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Index of current object with respect to children
  
    // Finish function (pass to children so they can tell parent when they finish)
    const finish = () => {
        setCurrentIndex((prevCount) => prevCount + 1);
    }

    // Hook to add objects to list when they are loaded.
    useEffect(() => {
        if(currentIndex < props.objects.length) {    

            // Add finish props
            const mergedProps = { ...props.objects[currentIndex].props, finish: finish };
            const clonedElement = React.cloneElement(props.objects[currentIndex], mergedProps);
    
            setSendObjects([...sendObjects, clonedElement]);
        }
    }, [currentIndex]);

    return <>
        {sendObjects.map((object) => (
                <>
                {object}
                </>
        ))}
    </>;
};