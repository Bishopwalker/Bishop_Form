import React from 'react';
import mockAxios from 'axios';
//import {render,cleanup, waitForElement, screen,act} from '@testing-library/react';
import ViewDatabase from './ViewDatabase';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import {createMemoryHistory} from "history";
//import {act} from "react-dom/test-utils";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {fireEvent, waitForElement, screen, act, cleanup, render} from '../../setupTests'


function renderWithRouter(ui,{route = '/', history=createMemoryHistory({initialEntries: [route]})} = {}) {
    return {
        ...render(<BrowserRouter history={history}>{ui}</BrowserRouter>),
        history,
    }
}



describe('View Database', () => {
     const handlers = [
        rest.get(`http://localhost:3003/form/users/`,(req, res, ctx) => {
            return res(ctx.json({
                data: [
                    {
                        "id": "1",
                        "firstname": "John",
                        "lastname": "Jones",
                        "age":25,
                        "hobbies": [
                            "football",
                            "coding"
                        ]
                    },
                    {
                        "id": "2",
                        "name": "Jane",
                        "email": ""
                    } ]
            }))
        })
    ]
const server = setupServer(...handlers);
     //Enable API mocking
    beforeAll(() => server.listen());
    //
    //Reset runtime request handlers we may add
    afterEach(() => server.resetHandlers());
    afterEach(cleanup);
//Disable API mocking after the tests are done
    afterAll(() => server.close());

    it('has a loading screen in the document with the correct text when it is loading', async () => {
      render(<ViewDatabase/>, {wrapper: BrowserRouter});
        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.getByTestId('loading')).toBeVisible();
        expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
    })
    it('persons the correct axios call', async () => {
     //   render(<ViewDatabase/>, {wrapper: BrowserRouter, container: document.body});
        mockAxios.get.mockImplementationOnce(async() =>
            Promise.resolve({
                data: {
                    "database": [
                        {
                            "id": 1,
                            "name": "John",
                            "age": "25",

                        }]
                }
            }))
        // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
          render(<ViewDatabase/>, {wrapper: BrowserRouter, container: document.body});
      })
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3003/form/users/');

    })

    test('fetches data',async()=>{
        render(<ViewDatabase/>, {wrapper: BrowserRouter, container: document.body});
       expect(await screen.findByText('Return to Form')).toBeInTheDocument()
        expect( screen.getByRole('link')).toHaveTextContent('Return to Form')
      //expect(await screen.findByText('DataBase Entries')).toBeInTheDocument()
        //console.log(screen.getByRole('link'))
        fireEvent.click(screen.getByRole('link'));
    })
})