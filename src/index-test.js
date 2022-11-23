import React from 'react';
import ReactDOM from 'react-dom';
import TestMain from './components/test/TestMain';
import commonSetup from './commonSetup';

// Import root LESS file so webpack finds & renders it out to unit.css
import './style/test.less';


commonSetup();

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<TestMain />, document.body);
/* eslint-enable react/jsx-filename-extension */
