import React, { Component } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'

class RenderSheetMusic extends Component {
	constructor(props) {
		super(props);
		this.state = { dataReady: false };
		this.osmd = undefined;
		this.divRef = React.createRef();
	}

	setupOsmd() {
		const defaultColor = '#0C101F';
		const options = {
			backend: 'svg',
			drawingParameters: 'compacttight',
			autoResize: true,
			drawTitle: false,
			drawCredits: false,
			drawSubtitle: false,
			drawComposer: false,
			drawLyricist: false,
			drawMetronomeMarks: false,
			drawPartNames: false,
			drawPartAbbreviations: false,
			drawMeasureNumbers: false,
			drawmeasureNumbersOnlyAtSystemStart: true,
			drawTimeSignatures: true,
			// darkMode: true,
			defaultColorMusic: defaultColor,
			defaultColorNotehead: defaultColor,
			defaultColorStem: defaultColor,
			defaultColorRest: defaultColor,
			defaultColorLabel: defaultColor,
			defaultColorTitle: defaultColor,
			defaultColorBeam: defaultColor,
			defaultFontFamily: '$interfaceSmall',
			// stretchLastSystemLine: true,
		};

		this.osmd = new OSMD(this.divRef.current, options);
		this.osmd.load(this.props.file).then(() => this.osmd.render());
	}

	resize() {
		this.forceUpdate();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	componentDidUpdate(prevProps) {
		if (this.props.drawTitle !== prevProps.drawTitle) {
			this.setupOsmd();
		} else {
			this.osmd.load(this.props.file).then(() => this.osmd.render());
		}
		window.addEventListener('resize', this.resize);
	}

	componentDidMount() {
		this.setupOsmd();
	}

	render() {
		return <div ref={this.divRef} />;
	}
}

export { RenderSheetMusic }