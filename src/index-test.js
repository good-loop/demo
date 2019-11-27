/** @jsx h */
import { render, h } from 'preact';
import TestMain from './components/test/TestMain';

import commonSetup from './commonSetup';

commonSetup();

/* eslint-disable react/jsx-filename-extension */
render(<TestMain />, document.body);
/* eslint-enable react/jsx-filename-extension */
