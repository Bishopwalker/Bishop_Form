import React from 'react'
import {render, cleanup, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import DatabaseEditForm from './DatabaseEditForm'
import {MemoryRouter} from 'react-router-dom'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    pathname: '/database/edit/1',
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
    it('It fetches and displays data',async()=>{
        const history = createMemoryHistory()
        const state = {
            person: {
                id:0,
                age: 4,
                lastName: 'Smith',
                firstName: 'Jim',
                hobbies: 'Everythign under the sun',
            }
        }
        history.push({
            pathname: '/database/edit/1',
            state: state
        })
    const {} = render(
        <Router history={history} location={history.location} navigator={history} initialEntries={[{pathname: '/editDatabase', from:{state:' person: {\n' +
                    '                        id:0,\n' +
                    '                        age: 4,\n' +
                    '                        lastName: \'Smith\',\n' +
                    '                        firstName: \'Jim\',\n' +
                    '                        hobbies: \'Everythign under the sun\',\n' +
                    '                    }'} }]} >
            <DatabaseEditForm/>
        </Router>
    );
    })
    it('trying another method',()=>{
        const history = createMemoryHistory()
        const state = {
            person: {
                id:0,
                age: 4,
                lastName: 'Smith',
                firstName: 'Jim',
                hobbies: 'Everythign under the sun',
            }
        }
        history.push({
            pathname: '/database/edit/1',
            state: state
        })
        let {getByTestId,getByRole}=  render(
            <Router history={history}>
            <DatabaseEditForm/>
            </Router>,{route: '/database/edit/1',state:state}
        );
    })
})