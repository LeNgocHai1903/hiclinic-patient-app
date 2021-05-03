import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import ClinicItem from './ClinicItem-List';

describe('Grid View Component', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render clinic item information', async () => {
    const data = {
      id: '3',
      name: 'Thái Bình Dương',
      workingTime: '9AM - 6PM',
      address: '34-36 Đinh Tiên Hoàng, P.Đa Kao, Q.1, TP. HCM',
      rating: 5,
      description: 'Website: www.phongkhamdakhoathaibinhduong.vn',
    };
    act(() => {
      render(<ClinicItem data={data} />, container);
    });

    expect(container.querySelector('h5').textContent).toBe('Thái Bình Dương');

    expect(container.querySelector('[data-test-time="time"]').textContent).toBe('Working Time: 9AM - 6PM');
    expect(container.querySelector('[data-test-address="address"]').textContent).toBe(
      'Address: 34-36 Đinh Tiên Hoàng, P.Đa Kao, Q.1, TP. HCM',
    );

    expect(container.querySelector('[data-test-description="description"]').textContent).toBe(
      'Website: www.phongkhamdakhoathaibinhduong.vn',
    );
  });
});
