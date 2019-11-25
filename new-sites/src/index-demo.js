/** @jsx h */
import { render, h } from 'preact';
import DemoMain from './DemoMain';

import commonSetup from './commonSetup';
import { StoreProvider } from './Store';

commonSetup();

/* eslint-disable react/jsx-filename-extension */
render(
    <StoreProvider>
        <DemoMain />
    </StoreProvider>
    , document.body);
/* eslint-enable react/jsx-filename-extension */
