import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../store/index'
import Header from './Header';
import { configureStore } from '@reduxjs/toolkit';
import { setLoadingState } from '../store/loadingSlice'
import loadingReducer from '../store/loadingSlice'

describe('Header', () => {
  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const titleElement = screen.getByText('Podcaster');
    expect(titleElement).toBeInTheDocument();
  })

  test('renders Header component with spinner', () => {
    // Set loading state to true
    const testStore = configureStore({
        reducer: { loading: loadingReducer },
    })
    testStore.dispatch(setLoadingState(true))

    render(
        <Provider store={testStore}>
            <Router>
                <Header />
            </Router>
        </Provider>
    )

      const spinnerElement = screen.queryByRole('status');
      expect(spinnerElement).toBeInTheDocument();
  })

  test('renders Header component without spinner', () => {
    // Set loading state to false
    const testStore = configureStore({
        reducer: { loading: loadingReducer },
    })

    testStore.dispatch(setLoadingState(false))

    render(
      <Provider store={testStore}>
        <Router>
            <Header />
        </Router>
      </Provider>
    )

    const spinnerElement = screen.queryByRole('status')
    expect(spinnerElement).toBeNull()
  })
});