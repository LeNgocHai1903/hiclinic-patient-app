import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import MainSearchBar from './MainSearchBar';

describe('News List Component', () => {
  it('should render component correctly', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <MainSearchBar />
        </MemoryRouter>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
