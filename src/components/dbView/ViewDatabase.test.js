import React from 'react';
import mockAxios from 'axios';
import {render,cleanup, waitForElement, screen} from '@testing-library/react';
import ViewDatabase from './ViewDatabase';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
describe('View Database', () => {
    afterEach(cleanup);

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
        render(<ViewDatabase/>, {wrapper: BrowserRouter, container: document.body});
     //
      expect(screen.getByTestId('db')).toBeInTheDocument();
     //   const resolved = await screen.findByTestId('db');
      //  expect(resolved).toBeVisible()
    })
})