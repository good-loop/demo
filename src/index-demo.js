import React from 'react';
import ReactDOM from 'react-dom';
import DemoMain from './components/demo/DemoMain';
import commonSetup from './commonSetup';

// Import root LESS file so webpack finds & renders it out to unit.css
import './style/demo.less';


commonSetup();

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<DemoMain />, document.body);
/* eslint-enable react/jsx-filename-extension */
