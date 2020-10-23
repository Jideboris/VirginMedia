import React from 'react';
import Home from './Home';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
describe('home component', () => {
    it('renders without crashing', () => {
        shallow(<Home />);
    });
});