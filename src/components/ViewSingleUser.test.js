import React, {useRef} from 'react';
 import {render, cleanup, screen} from'../setupTests'
//import {render,screen} from '@testing-library/react';
import ViewSingleUser from './ViewSingleUser';
import userEvent from "@testing-library/user-event";
import {createMemoryHistory} from 'history'
import {BrowserRouter, MemoryRouter, useLocation} from 'react-router-dom'
import '@testing-library/jest-dom'
import {mocked} from 'jest-mock';

// const renderWithRouter=(ui, {route='localhost:3000/viewSingleUser'} = {}) =>{
//     const history = createMemoryHistory()
//      history.push(route,{state: {
//             firstName: 'Jeff',
//             lastName: 'Dodds',
//             age: 40,
//             hobbies: 'Surfing'
//         }})
//     return render(<Provider store={store}>{ui}</Provider>, {wrapper: BrowserRouter})
// }
// const history = createMemoryHistory()
// const renderWithRouter2=Component=> render(
//     <Router history={history}>
//         <Route component={Component}/>
//     </Router>
// )
jest.mock("react-router-dom",()=>({
    ...jest.requireActual("react-router-dom"),
    useLocation:() => ({
        pathname: 'localhost:3000/viewSingleUser',
    })

}))
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useRef: jest.fn(),
}));
const useMockedRef = mocked(useRef);
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


    //afterEach(cleanup)
    afterEach(() => {
        jest.clearAllMocks()
        cleanup()
    })
    afterAll(() =>{
        jest.resetAllMocks()
    })


    test('Should take a snapshot', () => {
       // const ref = { current: { people: {people:[{id:3,firstName: 'Jeff', lastName: 'Dodds', age: 40, hobbies: 'Surfing'}]}}}
        //jest.spyOn(React, 'useRef').mockReturnValueOnce({current: {people: {people:[{id:3,firstName: 'Jeff', lastName: 'Dodds', age: 40, hobbies: 'Surfing'}]}}});
        const {asFragment} = render(<ViewSingleUser />)
        expect(asFragment()).toMatchSnapshot()
    })
    test('Should render the correct text', () => {
         render(<ViewSingleUser />)
        expect(screen.getByText(/The List is empty/i)).toBeInTheDocument()
       // expect(screen.getByText(/Age/i)).toBeInTheDocument()
       // expect(screen.getByText(/Hobbies/i)).toBeInTheDocument()
    })
})