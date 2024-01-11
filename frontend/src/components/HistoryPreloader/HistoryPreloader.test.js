import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HistoryPreloader from './HistoryPreloader';

describe('<HistoryPreloader />', () => {
  test('it should mount', () => {
    render(<HistoryPreloader />);
    
    const historyPreloader = screen.getByTestId('HistoryPreloader');

    expect(historyPreloader).toBeInTheDocument();
  });
});