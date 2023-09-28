'use client'

import { useState, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from "opensheetmusicdisplay"

const OpenSheetMusicDisplay = (props) => {
  const [dataReady, setDataReady] = useState(false);
  const divRef = useRef(null);
  let osmd = useRef(null);

  const setupOsmd = () => {
    const options = {
      autoResize: props.autoResize !== undefined ? props.autoResize : true,
      drawTitle: props.drawTitle !== undefined ? props.drawTitle : true,
    };
    osmd.current = new OSMD(divRef.current, options);
    osmd.current.load(props.file).then(() => osmd.current.render());
  };

  const resize = () => {
    osmd.current?.render(); // Re-render when resizing
  };

  useEffect(() => {
    setupOsmd();

    // Add event listener for resize
    window.addEventListener('resize', resize);

    // Clean up the event listener when unmounting
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [props.drawTitle, props.file]);

  return <div ref={divRef} />;
}

export { OpenSheetMusicDisplay };