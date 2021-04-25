import React from 'react'
import renderer from 'react-test-renderer'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom';
import NewsList from './NewsList'
import { MemoryRouter } from 'react-router-dom';

describe('News List Component', () => {
    it('should render component correctly', () => {
        const component = renderer.create(<NewsList />).toJSON();
        expect(component).toMatchSnapshot();
    })

    it('should render component correctly', () => {
        const component = renderer.create(
            <MemoryRouter>
                <NewsList />
            </MemoryRouter>
        ).toJSON();
        expect(component).toMatchSnapshot();
    })
})