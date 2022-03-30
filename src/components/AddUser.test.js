import React from 'react';
import{render, fireEvent, waitFor, screen} from '@testing-library/react';
import AddUser from './AddUser';
import * as reactRedux  from 'react-redux';
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";

describe("Add User",()=>{
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(()=>{
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();


    })
    //
    // it('Should take a snapshot',async()=>{
    //     try {
    //         const {asFragment} = await render(<AddUser/>, {wrapper: BrowserRouter});
    //         expect(asFragment()).toMatchSnapshot();
    //     } catch (e) {
    //         console.log(e);
    //     }
    //
    // })

it('does something',()=> {
    const dummyDispatch = jest.fn();
    const dummySelector = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
    useSelectorMock.mockReturnValue(dummySelector);
    //Sanity Check

    expect(dummyDispatch).not.toHaveBeenCalled();
    render(<AddUser/>, {wrapper: BrowserRouter});
    //screen.getByRole('button',{name:'Submit Form'});
    userEvent.click(screen.getByRole('button', {name: 'Submit Form'}));
    expect(dummyDispatch).toHaveBeenCalled();   //Check if the dispatch function is called
})

})