import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListHistoryComponent from './ListHistoryComponent';

describe('<ListHistoryComponent />', () => {
  test('it should mount', () => {
    render(<ListHistoryComponent />);
    
    const listHistoryComponent = screen.getByTestId('ListHistoryComponent');

    expect(listHistoryComponent).toBeInTheDocument();
  });
});