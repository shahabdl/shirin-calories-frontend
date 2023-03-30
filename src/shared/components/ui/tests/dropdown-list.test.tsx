import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react'
import DropdownList from '../dropdown-list'

it('has to set on first element when there is no default option', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} />
    )
    const dropDownButton = screen.getByRole('button');
    expect(dropDownButton).toHaveTextContent('op1');
    //we expect to recive 2 calls on dropdownlist initialize.
    //first one is for setting default option to 0 second one is when we check to see default value is number or string then set it
    expect(mockCallbackFunction.mock.calls).toHaveLength(2);
})

it('has to set on default option', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} defaultValue={1} />
    )
    const dropDownButton = screen.getByRole('button');
    expect(dropDownButton).toHaveTextContent('op2');
})

it('has to set on default option when defaultValue is value of option not the key', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} defaultValue={"op3"} />
    )
    const dropDownButton = screen.getByRole('button');
    expect(dropDownButton).toHaveTextContent('op3');
})

it('opens list of options and all options should be available in list', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} />
    )
    const dropdownOptions = screen.getByTestId('dropdown-options');
    expect(dropdownOptions).toHaveTextContent('op1');
    expect(dropdownOptions).toHaveTextContent('op2');
    expect(dropdownOptions).toHaveTextContent('op3');
})

it('should change selected option when user clicks on an option', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} defaultValue={1} />
    )
    const dropdownButton = screen.getByRole('button');

    userEvent.click(dropdownButton);
    const selectedOption = screen.getByTestId('option-op3');
    userEvent.click(selectedOption);
    expect(dropdownButton).toHaveTextContent("op3");
    expect(mockCallbackFunction.mock.calls).toHaveLength(3);
})

it('change selected option background to bg-secondary and dark:bg-secondary-dark', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} defaultValue={1} />
    )
    const dropdownButton = screen.getByRole('button');

    userEvent.click(dropdownButton);

    const selectedOption = screen.getByTestId('option-op2');
    expect(selectedOption).toHaveClass('bg-secondary');
    expect(selectedOption).toHaveClass('dark:bg-secondary-dark');
})

it('change not selected options class to bg-primary and dark:bg-primary-dark', () => {
    const mockCallbackFunction = jest.fn();
    render(
        <DropdownList onSelect={mockCallbackFunction} options={['op1', 'op2', 'op3']} defaultValue={1} />
    )
    const dropdownButton = screen.getByRole('button');

    userEvent.click(dropdownButton);

    const selectedOption1 = screen.getByTestId('option-op1');
    expect(selectedOption1).toHaveClass('bg-primary');
    expect(selectedOption1).toHaveClass('dark:bg-primary-dark');
    const selectedOption3 = screen.getByTestId('option-op3');
    expect(selectedOption3).toHaveClass('bg-primary');
    expect(selectedOption3).toHaveClass('dark:bg-primary-dark');
})