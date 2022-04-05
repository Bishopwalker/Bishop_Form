import React, {Component} from 'react';
 //import {render} from'../setupTests'
import {render,screen} from '@testing-library/react';
import ViewSingleUser from './ViewSingleUser';
import userEvent from "@testing-library/user-event";
import {createMemoryHistory} from 'history'
import {BrowserRouter, MemoryRouter, useLocation} from 'react-router-dom'
import '@testing-library/jest-dom'
import {Provider, useSelector} from "react-redux";
import store from '../ducks/store'
import {Router, Route} from 'react-router'
const renderWithRouter=(ui, {route='localhost:3000/viewSingleUser'} = {}) =>{
    const history = createMemoryHistory()
     history.push(route,{state: {
            firstName: 'Jeff',
            lastName: 'Dodds',
            age: 40,
            hobbies: 'Surfing'
        }})
    return render(<Provider store={store}>{ui}</Provider>, {wrapper: BrowserRouter})
}
const history = createMemoryHistory()
const renderWithRouter2=Component=> render(
    <Router history={history}>
        <Route component={Component}/>
    </Router>
)
jest.mock("react-router-dom",()=>({
    ...jest.requireActual("react-router-dom"),
    useLocation:() => ({
        pathname: 'localhost:3000/viewSingleUser',
    })

}))
jest.mock("react-redux",()=>({
    ...jest.requireActual("react-redux"),
    useSelector:jest.fn()
}))
let person = {
    state: {
        firstName: 'Jeff',
        lastName: 'Dodds',
        age: 40,
        hobbies: 'Surfing'
    }
}

describe('View Single User Component', () => {
    function mockAppState() {

    }

    beforeEach(() =>{
        useSelector.mockImplementation(callback=> {
            return callback(person)
        })
    })
    afterEach(() => {
        useSelector.mockClear()
    })

    let loco={
        obj:''
    }

    let location ={
        state : [{person}]


    }
    // test('should not render if person length is zero',()=>{
    //     const history = createMemoryHistory()
    //     render(<ViewSingleUser from={location} path='/viewSingleUser' location={loco}/>,{wrapper: MemoryRouter})
    //     expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    //
    // })
    test('render',()=>{
        // renderWithRouter(<ViewSingleUser/>)
        // expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
        const render = () => renderWithRouter(ViewSingleUser)
        console.log(render)
        expect(screen.getByText(/Return Back to Form/i)).toBeInTheDocument()
    })
    test('render something else',()=>{
        const history = createMemoryHistory()
        history.push( 'http://localhost:3003/form/users/',{state: {
                firstName: 'Jeff',
                lastName: 'Dodds',
                age: 40,
                hobbies: 'Surfing'
            }})
     // const rendered =  renderWithRouter(<ViewSingleUser history={history}/>)
    })

    test('app',()=>{
        const history = createMemoryHistory()
        render(
            <BrowserRouter pathname='http://localhost:3003/form/users/' history={history}>
                <ViewSingleUser history={history} location={history.location} />
            </BrowserRouter>
        )
        expect(screen.getByText('Hobbbies')).toBeInTheDocument();
    })


})