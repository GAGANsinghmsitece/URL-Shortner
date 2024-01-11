import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmptyHistoryState from './EmptyHistoryState';

describe('<EmptyHistoryState />', () => {
  test('it should mount', () => {
    render(<EmptyHistoryState />);
    
    const emptyHistoryState = screen.getByTestId('EmptyHistoryState');

    expect(emptyHistoryState).toBeInTheDocument();
  });
});