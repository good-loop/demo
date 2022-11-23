import React, { Fragment} from 'react';

const dfltStyle = {
	display: 'block',
	position: 'relative',
	height: '1em',
	marginBottom: '0.5em',
};

let widths = [];

/** Creates a div full of variable-width grey boxes that suggest paragraphs of text */
const NotText = ({lineCount = 10, color = '#bbb', backgroundColor = 'transparent'}) => {
	if (widths.length !== lineCount) {
		for (let i = 0; i < lineCount; i++) {
			const lastLine = i === lineCount - 1;
			const endParagraph = !lastLine && Math.random() > 0.7; // TODO tune for nice looking "paragraphs"
			const shortLine = endParagraph || lastLine;

			let width = Math.random();
			// normal lines 75-100% width, end-paragraph 10-80% width
			width = Math.round(shortLine ? (10 + (width * 70)) : (75 + (width * 25))) + '%';

			widths.push(width);
			if (endParagraph) {
				widths.push(0);
				i++; // adding two lines so skip an iteration
			}
		}
	}

	const style = {...dfltStyle, color, backgroundColor};

	return <>
		{widths.map(width => <div className="not-text-line" style={{...style, width}} />)}
	</>;
};

export default NotText;
