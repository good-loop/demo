/** @jsx h */
import { render, h } from 'preact';
import DemoMain from './DemoMain';

import commonSetup from './commonSetup';

commonSetup();

/* eslint-disable react/jsx-filename-extension */
render(<DemoMain />, document.body);
/* eslint-enable react/jsx-filename-extension */
