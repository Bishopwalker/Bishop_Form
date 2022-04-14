import React from 'react';
import {render,cleanup,screen} from '../../setupTests'
import Login from './Login'
import * as reactRedux  from 'react-redux';
import {BrowserRouter} from "react-router-dom";

describe('Login', () =>{
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useDispatchMock.mockClear();
    });

    test('Should take a snapshot', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        try{
            const { asFragment } = await render(<Login />);
            expect(asFragment()).toMatchSnapshot();
        }catch (e) {
            console.log(e)
        }

    });
    test('Should render the login words twice', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

            await render(<Login />,{wrapper: BrowserRouter});
   ;
            expect(screen.getAllByText(/login/i)).toHaveLength(4);


    });
    test('Should have the words Login to your Hassan Form account', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        await render(<Login />,{wrapper: BrowserRouter});

        expect(screen.getByText(/to your Hassan Form account/i)).toBeInTheDocument();

    });
    test('should have a password input', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        await render(<Login />,{wrapper: BrowserRouter});

        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    });
    test('should have a email input', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        await render(<Login />,{wrapper: BrowserRouter});

        expect(await screen.findAllByPlaceholderText(/email/i)).toHaveLength(1);

    });
    test('should have a submit button', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        await render(<Login />,{wrapper: BrowserRouter});

        expect(screen.getByRole('button',{name: /login/i})).toBeInTheDocument();

    });
    test('should have a link to Skip Login', async() => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        await render(<Login />,{wrapper: BrowserRouter});

        expect(screen.getByText(/Skip Login/i)).toBeInTheDocument();
    expect(screen.getByRole('link',{name: /Skip Login/i})).toBeInTheDocument();

    });
})