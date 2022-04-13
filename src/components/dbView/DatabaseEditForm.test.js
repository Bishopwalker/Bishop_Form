import React from 'react'
import {render, cleanup, waitForElement, screen} from '../../setupTests';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import DatabaseEditForm from './DatabaseEditForm'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import ViewDatabase from "./ViewDatabase";

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

function renderWithRouter(ui,{route = '/', history=createMemoryHistory({initialEntries: [route,{}]}),location={}} = {}) {
    const state = {
        person: {
            id:0,
            age: 4,
            lastName: 'Smith',
            firstName: 'Jim',
            hobbies: 'Everythign under the sun',
        }
    }
    history.push(
        {pathname: '/database/edit/1'},
        {state: state}
    )
    return {
        ...render(<BrowserRouter history={history} location={history.location}>{ui}</BrowserRouter>),
        history,
    }
}

describe('Database EditForm',()=>{
    afterEach(cleanup);
    // it('It fetches and displays data',async()=>{
    //     const history = createMemoryHistory()
    //     const state = {
    //         person: {
    //             id:0,
    //             age: 4,
    //             lastName: 'Smith',
    //             firstName: 'Jim',
    //             hobbies: 'Everythign under the sun',
    //         }
    //     }
    //     history.push({
    //         pathname: '/database/edit/1',
    //         state: state
    //     })
    // const {} = render(
    //     <Router history={history} location={history.location} navigator={history} initialEntries={[{pathname: '/editDatabase', from:{state:' person: {\n' +
    //                 '                        id:0,\n' +
    //                 '                        age: 4,\n' +
    //                 '                        lastName: \'Smith\',\n' +
    //                 '                        firstName: \'Jim\',\n' +
    //                 '                        hobbies: \'Everythign under the sun\',\n' +
    //                 '                    }'} }]} >
    //         <DatabaseEditForm/>
    //     </Router>
    // );
    // })
    // it('trying another method',()=>{
    //     const history = createMemoryHistory()
    //     const state = {
    //         person: {
    //             id:0,
    //             age: 4,
    //             lastName: 'Smith',
    //             firstName: 'Jim',
    //             hobbies: 'Everythign under the sun',
    //         }
    //     }
    //     history.push({
    //         pathname: '/database/edit/1',
    //         state: state
    //     })
    //     let {getByTestId,getByRole}=  render(
    //         <Router history={history}>
    //         <DatabaseEditForm/>
    //         </Router>,{route: '/database/edit/1',state:state}
    //     );
    // })
    test('Should have a first name input field',async()=>{
      //  renderWithRouter(<DatabaseEditForm/>,{route: 'http://localhost:3003/form/users-test/'})
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter, container: document.body, route:'http://localhost:3003/form/users-test/'});
       expect(await screen.findAllByPlaceholderText(/first name/i)).toHaveLength(1);
    })
    test('Should have a last name input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter, container: document.body, route:'http://localhost:3003/form/users-test/'});
        expect(await screen.findAllByPlaceholderText(/last name/i)).toHaveLength(1);
    })
    test('Should have an age input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter, container: document.body, route:'http://localhost:3003/form/users-test/'});
        expect(await screen.findAllByPlaceholderText(/age/i)).toHaveLength(1);
    })
    test('Should have a hobbies input field',async()=>{
        render(<DatabaseEditForm/>, {wrapper: BrowserRouter, container: document.body, route:'http://localhost:3003/form/users-test/'});
        expect(await screen.findAllByPlaceholderText(/hobbies/i)).toHaveLength(1);
    })
})