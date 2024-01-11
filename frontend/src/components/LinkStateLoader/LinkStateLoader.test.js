import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LinkStateLoader from './LinkStateLoader';

describe('<LinkStateLoader />', () => {
  test('it should mount', () => {
    render(<LinkStateLoader />);
    
    const linkStateLoader = screen.getByTestId('LinkStateLoader');

    expect(linkStateLoader).toBeInTheDocument();
  });
});