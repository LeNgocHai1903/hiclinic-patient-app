import renderer from 'react-test-renderer';
import ClinicList from './ClinicList';

describe('ClinicList Component', () => {
  it('should render component correctly', () => {
    const component = renderer.create(<ClinicList />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
