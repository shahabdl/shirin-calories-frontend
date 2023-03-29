import {render, screen} from '@testing-library/react';
import React from 'react';
import InputNumber from '../input-number';
import userEvent from '@testing-library/user-event'

test('default value must be 0 if it is not specified in Component initializing',()=>{
    render(<InputNumber onChange={jest.fn()}/>);
    const inputBox = screen.getByRole('spinbutton', {name: "number-input-box"})  as HTMLInputElement;
    expect(parseFloat(inputBox.value)).toBe(0);
})

test('default value must be same as initialized value',()=>{
    render(<InputNumber defaultValue={5} onChange={jest.fn()}/>);
    const inputBox = screen.getByRole('spinbutton', {name:"number-input-box"}) as HTMLInputElement;
    expect(parseFloat(inputBox.value)).toBe(5);
})

test('value must increase by clicking on + button', ()=>{
    render(<InputNumber onChange={jest.fn()} />);
    const inputBox = screen.getByRole('spinbutton', {name:"number-input-box"}) as HTMLInputElement;;
    const incrementButton = screen.getByText('+');
    userEvent.click(incrementButton);
    expect(parseFloat(inputBox.value)).toBe(1);
})

test('value must decrease by clicking on - button', ()=>{
    render(<InputNumber defaultValue={1} onChange={jest.fn()}/>);
    const inputBox = screen.getByRole('spinbutton', {name:"number-input-box"}) as HTMLInputElement;;
    const incrementButton = screen.getByText('-');
    userEvent.click(incrementButton);
    expect(parseFloat(inputBox.value)).toBe(0);
})

test('when negative is false input should stay greater than 0',()=>{
    render(<InputNumber defaultValue={0.5} onChange={jest.fn()}/>);
    const inputBox = screen.getByRole('spinbutton', {name:"number-input-box"}) as HTMLInputElement;;
    const incrementButton = screen.getByText('-');
    userEvent.click(incrementButton);
    expect(parseFloat(inputBox.value)).toBe(0.5);
})

test('when negative is true input can be less than 0',()=>{
    render(<InputNumber defaultValue={0.5} canBeNegative={true} onChange={jest.fn()}/>);
    const inputBox = screen.getByRole('spinbutton', {name:"number-input-box"}) as HTMLInputElement;;
    const incrementButton = screen.getByText('-');
    userEvent.click(incrementButton);
    expect(parseFloat(inputBox.value)).toBe(-0.5);
})