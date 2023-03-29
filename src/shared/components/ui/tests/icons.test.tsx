import React from 'react';
import { render, screen } from '@testing-library/react';
import SvgIcon from '../icons';

test('Write icon name when icon is not available', () => {
    render(<SvgIcon icon="test" />);
    const icon = screen.getByText('test');
    expect(icon.innerHTML).toBe('test');
});

test('Icon to have right width and height and classNames', () => {
    render(<SvgIcon icon="darkModeSunIcon" width="55" height="55"/>);
    const icon = screen.getByTestId('icon-test');
    expect(icon.getAttribute('width')).toBe('55');
    expect(icon.getAttribute('height')).toBe('55');
});