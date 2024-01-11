import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LinkShortComponent from './LinkShortComponent';

describe('<LinkShortComponent />', () => {
  test('it should mount', () => {
    render(<LinkShortComponent />);
    
    const linkShortComponent = screen.getByTestId('LinkShortComponent');

    expect(linkShortComponent).toBeInTheDocument();
  });
});