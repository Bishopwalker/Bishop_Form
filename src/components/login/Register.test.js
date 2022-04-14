import React from 'react';
import {render,cleanup,screen} from '../../setupTests'
import * as reactRedux  from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import Register from './Register'

describe('Register person form',()=>{
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useDispatchMock.mockClear();
    });
test('Should take a snapshot',()=>{
    const {asFragment} = render(<BrowserRouter><Register/></BrowserRouter>)
    expect(asFragment()).toMatchSnapshot()
})
    test('Should Render the words signup',async()=>{
        await render(<Register/>,{wrapper: BrowserRouter})
        expect( screen.getByText(/Sign Up/i)).toBeInTheDocument()
    })
    test('Should have the words Create your Hassan Account',()=>{
        render(<Register/>,{wrapper: BrowserRouter})
        expect(screen.getByText(/Create your Hassan Account/i)).toBeInTheDocument()
    })
    test('Should have the words Email Address ',()=>{
        render(<Register/>,{wrapper: BrowserRouter})

        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument()
    })
    test('Should have a link with the word Login written',()=>{
        render(<Register/>,{wrapper: BrowserRouter})
        expect(screen.getByText(/Login/i)).toBeInTheDocument()
        expect(screen.getByRole('link',{name:/Login/i})).toBeInTheDocument()
    })
    test('Should have the words Password twice',async()=>{
        render(<Register/>,{wrapper: BrowserRouter})
        expect( screen.getAllByPlaceholderText(/Password/i)).toHaveLength(2)
    })
    test('Should have a placeholder for the word Confirm Password',async()=>{
        render(<Register/>,{wrapper: BrowserRouter})
        expect(await screen.findByPlaceholderText(/Confirm Password/i)).toBeInTheDocument()
    })
    test('Should have a button with the word Submit',async()=>{
        render(<Register/>,{wrapper: BrowserRouter})
        expect(await screen.findByRole('button',{name:/Submit/i})).toBeInTheDocument()
    })
})