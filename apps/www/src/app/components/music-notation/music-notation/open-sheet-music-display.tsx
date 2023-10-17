'use client'

import { useState, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from "opensheetmusicdisplay"
import { OpenSheetMusicDisplayProps } from './types'

const OpenSheetMusicDisplay = ({ 
  file,
  backend = 'canvas',
  autoResize = true,
  drawingParameters = 'compacttight',
  drawTitle = false,
  drawSubtitle = false,
  drawComposer = false,
  drawLyricist = false,
  drawCredits = false,
  drawPartNames = false,
  drawMetronomeMarks = false,
  drawTimeSignatures = true,
  drawMeasureNumbers = false,
  drawMeasureNumbersOnlyAtSystemStart = false,
  drawLyrics = false,
  measureNumberInterval = 5,
  className
}: OpenSheetMusicDisplayProps) => {
  const [dataReady, setDataReady] = useState(false);
  const divRef = useRef(null);
  let osmd = useRef(null);

  // Define OSMD options/settings
  const osmdOptions = {
    autoResize: autoResize,
    engravingRules: {
      defaultFontFamily: 'Arial',
    },
    backend: backend,
    drawingParameters: drawingParameters,
    drawTitle: drawTitle,
    drawSubtitle: drawSubtitle,
    drawComposer: drawComposer,
    drawLyricist: drawLyricist,
    drawLyrics: drawLyrics,
    drawCredits: drawCredits,
    drawPartNames: drawPartNames,
    drawMetronomeMarks: drawMetronomeMarks,
    drawTimeSignatures: drawTimeSignatures,
    drawMeasureNumbers: drawMeasureNumbers,
    drawMeasureNumbersOnlyAtSystemStart: drawMeasureNumbersOnlyAtSystemStart,
    measureNumberInterval: measureNumberInterval,
    defaultColorMusic: '#030923',
  }

  const resize = () => {
    osmd.current?.render(); // Re-render when resizing
  };

  useEffect(() => {    
    const setupOsmd = () => {      
      osmd.current = new OSMD(divRef.current, osmdOptions);
      osmd.current.load(file).then(() => osmd.current.render());
    };

    setupOsmd();

    // Add event listener for resize
    window.addEventListener('resize', resize);

    // Clean up the event listener when unmounting
    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  return <div className={className} ref={divRef} />;
}

export { OpenSheetMusicDisplay };