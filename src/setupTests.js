// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {render as rtlRender} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import reducer from './ducks/reducer'
import {BrowserRouter} from "react-router-dom";
import {createMemoryHistory} from "history";
//create a customRender that wraps the UI in a memory Router
// const customRender=(ui,options)=>{
//     return render(ui, {wrapper: MemoryRouter, ...options})
// }
// //re-export everything
// export * from '@testing-library/react'
//
// //override render method
//
// export {customRender as render};

function render(
    ui,
    {   route = '/',
        history = createMemoryHistory({initialEntries: [route]}),
        preloadedState,
        store = configureStore({ reducer: { ...reducer, ...preloadedState } }),
        ...renderOptions
    } ={}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
// re-export everything
export * from '@testing-library/react';

// override render method
export {render};
