import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShortedUrl from './ShortedUrl';

describe('<ShortedUrl />', () => {
  test('it should mount', () => {
    render(<ShortedUrl />);
    
    const shortedUrl = screen.getByTestId('ShortedUrl');

    expect(shortedUrl).toBeInTheDocument();
  });
});