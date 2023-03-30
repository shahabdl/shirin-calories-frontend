import { render, screen } from '@testing-library/react';
import React from 'react';
import InputNumber from '../input-number';
import userEvent from '@testing-library/user-event'

test('default value must be 0 if it is not specified in Component initializing', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;
    //input box value should be 0 if there is no defaultValue
    expect(parseFloat(inputBox.value)).toBe(0);
    //first parameter of first call of onChange callback should be 0 when there is no defaultValue
    expect(mockOnChangeFunction.mock.calls[0][0]).toBe(0);

})

test('default value must be same as initialized value', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber defaultValue={5} onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;
    //input text should be Default value
    expect(parseFloat(inputBox.value)).toBe(5);
    //onChange callback function first parameter of first call should be 5
    expect(mockOnChangeFunction.mock.calls[0][0]).toBe(5);
})

test('value must increase by clicking on + button', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;;
    const incrementButton = screen.getByText('+');
    userEvent.click(incrementButton);
    //input text should change to new value (last value + 1) when user clicks on + button
    expect(parseFloat(inputBox.value)).toBe(1);
    //first parameter of second call of onChange callback should be new value when user clicks on + button, first call is initial value
    expect(mockOnChangeFunction.mock.calls[1][0]).toBe(1);
})

test('value must decrease by clicking on - button', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber defaultValue={1} onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;;
    const decrementButton = screen.getByText('-');
    userEvent.click(decrementButton);
    //input text should change to new value (last value - 1) when user clicks on - button
    expect(parseFloat(inputBox.value)).toBe(0);
    //first parameter of second call of onChange callback should be new value when user clicks on - button, first call is initial value
    expect(mockOnChangeFunction.mock.calls[1][0]).toBe(0);
})

test('when negative is false input should stay greater than 0', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber defaultValue={0.5} onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;;
    const decrementButton = screen.getByText('-');
    userEvent.click(decrementButton);
    //input text should stay greater than 0 when user clicks on - button
    expect(parseFloat(inputBox.value)).toBe(0.5);
    //onChange callback should not call when input value stays the same
    expect(mockOnChangeFunction.mock.calls).toHaveLength(1);

})

test('when negative is true input can be less than 0', () => {
    const mockOnChangeFunction = jest.fn();
    render(<InputNumber defaultValue={0.5} canBeNegative={true} onChange={mockOnChangeFunction} />);
    const inputBox = screen.getByRole('spinbutton', { name: "number-input-box" }) as HTMLInputElement;;
    const incrementButton = screen.getByText('-');
    userEvent.click(incrementButton);
    //input text should change to new value (last value - 1) when user clicks on - button
    expect(parseFloat(inputBox.value)).toBe(-0.5);
    //first parameter of second call of onChange callback should be new value when user clicks on - button, first call is initial value
    expect(mockOnChangeFunction.mock.calls[1][0]).toBe(-0.5);
})