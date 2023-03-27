import { render, screen } from '@testing-library/react';
import React from 'react';
import { IngredientProvider } from '../../../context/meal-context';
import SearchIngred from '../search-ingreds';
import userEvent from '@testing-library/user-event'

jest.useFakeTimers();

beforeEach(()=>{
    window.localStorage.setItem('_access_token','test');
})

afterEach(()=>{
    window.localStorage.removeItem('_access_token');
})

it('should display "Enter Food Name in Search Box" when you opening search box', async () => {

    const mockDisplayFunction = jest.fn();
    render(
        <IngredientProvider>
            <SearchIngred changeSearchVisibility={mockDisplayFunction} />
        </IngredientProvider>
    );

    expect(screen.getByText(/Enter Food Name in Search Box/i)).toBeTruthy();
})

// it('should display "search found no results" when user search has no results', () => {

//     const mockDisplayFunction = jest.fn();
//     render(
//         <IngredientProvider>
//             <SearchIngred changeSearchVisibility={mockDisplayFunction} />
//         </IngredientProvider>
//     );

//     const searchBox = screen.getByRole('search');
//     userEvent.type(searchBox, 'noresults');
//     jest.advanceTimersByTime(500);
//     //expect(screen.getByText(/search found no results/i)).toBeTruthy();
// })

it('should display "search found no results" when user search has no results', async () => {

    const mockDisplayFunction = jest.fn();
    render(
        <IngredientProvider>
            <SearchIngred changeSearchVisibility={mockDisplayFunction} />
        </IngredientProvider>
    );

    const searchBox = screen.getByRole('search');
    userEvent.type(searchBox, 'noresults');
    jest.advanceTimersByTime(500);
    const searchResText = await screen.findByText(/search found no results!/i);
    expect(searchResText).toBeTruthy();
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

