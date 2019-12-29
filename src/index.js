import React from 'react';
import { render } from 'react-dom';
import App from './app/app';

import './app/icon-library';

import './index.css';

const target = document.querySelector('#root');

render(<App />, target);
