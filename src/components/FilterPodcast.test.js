import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterPodcast from './FilterPodcast'

describe('FilterPodcast', () => {
    test('renders FilterPodcast component', () => {
        render(
            <FilterPodcast handleChangeFilter={() => {}}/>
        )

        const filterPodcast = screen.getByRole('filterPodcast')
        expect(filterPodcast).toBeInTheDocument()
    })

    test('renders input element', () => {
        render (
            <FilterPodcast handleChangeFilter={() => {}}/>
        )

        const inputElement = screen.getByPlaceholderText('Filter podcasts...')
        expect(inputElement).toBeInTheDocument()
    })

    test('updates input value on change', () => {
        /*  We need to recreate this function in our test
            const handleChangeFilter = useCallback((value) => {
                setFilter(value)
            }, [setFilter])
        */
        const setFilter = jest.fn()
        const handleChangeFilter = jest.fn((value) => setFilter(value))

        render (
            <FilterPodcast handleChangeFilter={handleChangeFilter}/>
        )

        const inputElement = screen.getByPlaceholderText('Filter podcasts...') 

        // Simulate user typing in input
        fireEvent.change(inputElement, {
            target: {
                value: 'test'
            }
        })

        // Verify that the funciton was called with test as the argument
        expect(handleChangeFilter).toHaveBeenCalledWith('test')
        expect(setFilter).toHaveBeenCalledWith('test')
    })

})