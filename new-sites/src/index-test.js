/** @jsx h */
import { render, h } from 'preact';
import TestMain from './TestMain';

import commonSetup from './commonSetup';

commonSetup();
console.log('index')
/* eslint-disable react/jsx-filename-extension */
render(<TestMain />, document.body);
/* eslint-enable react/jsx-filename-extension */
