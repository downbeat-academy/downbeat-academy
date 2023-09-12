// const transformQuality = (quality: string, type: 'text' | 'abbr' | 'symbol') => {
//   switch (type) {
//     case 'text': return quality
//     case 'abbr': {
//       switch (quality) {
//         case 'major': return 'maj'
//         case 'minor': return 'min'
//         case 'diminished': return 'dim'
//         case 'suspended': return 'sus'
//         case 'augmented': return 'aug'
//       }
//     }
//     case 'symbol': {
//       switch (quality) {
//         case 'major': return '&#1D148';
//         case 'minor': return 'min'
//         case 'diminished': return 'dim'
//         case 'suspended': return 'sus'
//         case 'augmented': return 'aug'
//       }
//     }
//   }
// }

// const transformSeventh = (seventh: string, type: 'text' | 'abbr' | 'symbol') => {
//   switch (type) {
//     case 'text': return seventh
//     case 'abbr': {
//       switch (seventh) {
//         case 'major7': return 'maj7'
//         case 'dominant7': return '7'
//         case 'minor7': return 'min7'
//         case 'halfDiminished7': return 'half'
//       }
//     }
//   }
// }

// const transformExtension = (extension) => {
  
// }

const getQuality = (
  quality: string,
  type: 'abbr' | 'symbol'
) => {
  switch (type) {
    case 'abbr': {
      switch (quality) {
        case 'major': return 'maj'
        case 'major7': return 'maj7'
        case 'major6': return 'maj6'
        case 'dominant7': return '7'
        case 'minor': return 'min'
        case 'minor7': return 'min7'
        case 'minMaj7': return 'm(maj7)'
        case 'diminished': return 'dim'
        case 'diminished7': return 'dim7'
        case 'halfDim7': return 'min7♭5'
        case 'suspended': return 'sus4'
        case 'augmented': return 'aug'
        case 'augmented7': return 'aug7'
        default: 'Chord quality not supported.'
      }
    }
    case 'symbol': {
      switch (quality) {
        case 'major': return 'maj'
        case 'major7': return 'maj7'
        case 'major6': return 'maj6'
        case 'dominant7': return '7'
        case 'minor': return 'min'
        case 'minor7': return 'min7'
        case 'minMaj7': return 'm(maj7)'
        case 'diminished': return 'dim'
        case 'diminished7': return 'dim7'
        case 'halfDim7': return 'min7♭5'
        case 'suspended': return 'sus4'
        case 'augmented': return 'aug'
        case 'augmented7': return 'aug7'
        default: 'Chord quality not supported.'
      }
    }
  }
}

const getExtension = (
  extension: string
) => {
  switch (extension) {
    case 'flat9': return '♭9'
    case 'flat5': return '♭5'
    case 'sharp5': return '♯5'
    case 'flat13': return '♭13'
    case 'sharp9': return '♯9'
    case 'sharp11': return '♯11'
    case 'sharp9flat9': return '♯9/♭9'
    case 'sixNine': return '6/9'
    case 'altered': return 'alt'
  }
}

const transformChord = (
  root: string,
  quality: string,
  extension: string,
  alternateBass: string,
  type: 'abbr' | 'symbol'
) => {

  return (
    <>
      {root}
      {quality && getQuality(quality, type)}
      {extension &&
        <sup>
          ({extension && getExtension(extension)})
        </sup>
      }
      {alternateBass && `/${alternateBass}`}
    </>
  );
}


export {
  transformChord,
}