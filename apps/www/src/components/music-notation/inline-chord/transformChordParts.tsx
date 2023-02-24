const transformExtension = (extension) => {
  switch (extension) {
    case 'flat9':
      return '♭9';
    case 'flat5':
      return '♭5';
    case 'flat13':
      return '♭13';
    case 'sharp9':
      return '♯9';
    case 'sharp11':
      return '♯11';
    case 'major7':
      return '(maj7)';
    case 'sharp9flat9':
      return '♯9/♭9';
    case 'sixNine':
      return '6/9';
    default:
      return null;
  }
}

  const transformQuality = (quality) => {
		switch (quality) {
			case 'major':
				return 'maj';
			case 'minor':
				return 'min';
			case 'suspended':
				return 'sus4';
			case 'diminished':
				return (
					<>
						<sup>o</sup>7
					</>
				);
			case 'augmented':
				return 'aug';
			default:
				return null;
		}
	}

const transformSeventh = (seventh) => {
  switch (seventh) {
    case 'major7':
      return '7';
    case 'dominant7':
      return '7';
    case 'minor7':
      return '7';
    case 'halfDiminished7':
      return (
        <>
          <sup>ø</sup>7
        </>
      );
    case 'diminished7':
      return (
        <>
          <sup>o</sup>7
        </>
      );
    default:
      return null;
  }
};

export { transformExtension, transformQuality, transformSeventh }