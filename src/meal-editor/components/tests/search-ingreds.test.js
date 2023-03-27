import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { IngredientProvider } from '../../../context/meal-context';
import SearchIngred from '../search-ingreds';
import userEvent from '@testing-library/user-event'

jest.useFakeTimers();

beforeEach(()=>{
    window.localStorage.setItem('_access_token','test')
})

it('should display 1 item in App Foods section', async () => {

    const mockDisplayFunction = jest.fn();
    render(
        <IngredientProvider>
            <SearchIngred changeSearchVisibility={mockDisplayFunction} />
        </IngredientProvider>
    );

    const searchBox = screen.getByRole('search');
    userEvent.type(searchBox, 'test');
    jest.advanceTimersByTime(500);
    const itemImage = await screen.findAllByTestId('search-item');
    expect(itemImage).toHaveLength(1);
})