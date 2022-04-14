import React from 'react'
import {render, cleanup, waitForElement, screen} from '../../setupTests';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import DatabaseEditForm from './DatabaseEditForm'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import ViewDatabase from "./ViewDatabase";
import {getByTestId} from "@testing-library/react";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
      pathname: 'localhost:3000/viewSingleUser',
      location: {
        state:{
            person: {
                id:0,
                age: 4,
                lastName: 'Smith',
                firstName: 'Jim',
                hobbies: 'Everythign under the sun',
            }
        }
      }
  })
}))


describe('Database EditForm',()=>{
    afterEach(cleanup);
   test('Should take a snapshot',()=>{
       const {asFragment} = render(<DatabaseEditForm/>,{wrapper:BrowserRouter})
       expect(asFragment()).toMatchSnapshot()
   })
    test('Should have a first name input field',async()=>{
      //  renderWithRouter(<DatabaseEditForm/>,{route: 'http://localhost:3003/form/users-test/'})
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
       expect(await screen.findAllByPlaceholderText(/first name/i)).toHaveLength(1);
    })
    test('Should have a last name input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
        expect(await screen.findAllByPlaceholderText(/last name/i)).toHaveLength(1);
    })
    test('Should have an age input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
        expect(await screen.findAllByPlaceholderText(/age/i)).toHaveLength(1);
    })
    test('Should have a hobbies input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
        expect(await screen.findAllByPlaceholderText(/hobbies/i)).toHaveLength(1);
    })
    test('Should have a update user button',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
        expect(await screen.findAllByText(/Update User/i)).toHaveLength(1);
    })
    test('Should have a link to return to database',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter});
        expect(await screen.findAllByText(/Return to db/i)).toHaveLength(1);
        expect(await screen.findByRole('link', {name: /return to db/i})).toBeInTheDocument();
    })

})