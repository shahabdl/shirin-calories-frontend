import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { click } from '@testing-library/user-event/dist/click'
import React from 'react'
import ToggleButton from '../toggle-button'

test('initial state to be unchecked',()=>{
    render(<ToggleButton onChange={jest.fn()}/>)
    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn.getAttribute('data-state')).toBe("false");
})

test('initial state to be defaultState if available',()=>{
    render(<ToggleButton onChange={jest.fn()} defaultState={true}/>)
    const toggleBtn = screen.getByRole('button');
    expect(toggleBtn.getAttribute('data-state')).toBe("true");
})

test('change state on click',()=>{
    render(<ToggleButton onChange={jest.fn()} defaultState={true}/>)
    const toggleBtn = screen.getByRole('button');
    userEvent.click(toggleBtn);
    expect(toggleBtn.getAttribute('data-state')).toBe("false");
})