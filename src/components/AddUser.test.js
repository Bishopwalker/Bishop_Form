import React from 'react';
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import AddUser from './AddUser';
import * as reactRedux  from 'react-redux';
import {createMemoryHistory} from "history";

import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";

describe("Add User",()=> {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const dummyDispatch = jest.fn();
    const dummySelector = jest.fn();
    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();


    })

    it('Should take a snapshot',async()=>{
        const dummyDispatch = jest.fn();
        const dummySelector = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        useSelectorMock.mockReturnValue(dummySelector);
        try {
            const {asFragment} = await render(<AddUser/>, {wrapper: BrowserRouter});
            fireEvent.click(screen.getByText(/Submit Form/i))
            expect(asFragment()).toMatchSnapshot();
        } catch (e) {
            console.log(e);
        }

    })

    it('does something', () => {
        const dummyDispatch = jest.fn();
        const dummySelector = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        useSelectorMock.mockReturnValue(dummySelector);
        //Sanity Check

        expect(dummyDispatch).not.toHaveBeenCalled();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            render(<AddUser/>, {wrapper: BrowserRouter});
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(()=>{
        userEvent.click(screen.getByRole('button', {name: 'Submit Form'}));
        expect(dummyDispatch).toHaveBeenCalled();   //Check if the dispatch function is called

        })
    })
    it('has a hobbies input', () => {


        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            useDispatchMock.mockReturnValue(dummyDispatch);
            useSelectorMock.mockReturnValue(dummySelector);
            //Sanity Check

            expect(dummyDispatch).not.toHaveBeenCalled();
            render(<AddUser/>, {wrapper: BrowserRouter});
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {

            fireEvent.change(screen.getByPlaceholderText('Hobbies'), {target: {value: 'Hiking'}});
        })
        expect(screen.getByPlaceholderText('Hobbies').value).toBe('Hiking');
    })
    it('has a firstName input', () => {
        const dummyDispatch = jest.fn();
        const dummySelector = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        useSelectorMock.mockReturnValue(dummySelector);
        //Sanity Check
        expect(dummyDispatch).not.toHaveBeenCalled();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            render(<AddUser/>, {wrapper: BrowserRouter});
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('First Name'), {target: {value: 'John'}});
        })
        expect(screen.getByPlaceholderText('First Name').value).toBe('John');
    })
    it('has a last name input',()=>{
        const dummyDispatch = jest.fn();
        const dummySelector = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        useSelectorMock.mockReturnValue(dummySelector);
        //Sanity Check
        expect(dummyDispatch).not.toHaveBeenCalled();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            render(<AddUser/>, {wrapper: BrowserRouter});
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Last Name'), {target: {value: 'Doe'}});
        })
        expect(screen.getByPlaceholderText('Last Name').value).toBe('Doe');
    })
    it('has a age input function', () => {

    })
})