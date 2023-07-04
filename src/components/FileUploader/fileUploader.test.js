import React from "react";
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from 'store/rootReducer';
import { FileUploader } from './FileUploader';

const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
};

const files = [
    'test 1', 'test 2'
];

describe('FileUploader component', () => {
    beforeEach(cleanup);
    const axios = {
        get: jest.fn(),
    };
    it('should render FileUploader component', () => {
        const { baseElement } = renderWithRedux(<FileUploader name="test" inputName="test" />);

        expect(baseElement).toBeInTheDocument();
    });

    it('fetch files from an API', async () => {
        renderWithRedux(<FileUploader name="test" inputName="test" />);
        axios.get.mockResolvedValue({ data: files });
        expect(screen.queryByTestId('listitem')).not.toBeInTheDocument();
        // const items = await screen.findAllByTestId('listitem');
        // expect(items).toHaveLength(2);
        expect(axios.get).toBeCalledTimes(1);
    });
});
