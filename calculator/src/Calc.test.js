import React from 'react';
import ReactDOM from 'react-dom';
import Calc from './Calc';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calc />, div);
});
