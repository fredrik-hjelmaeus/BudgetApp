import { render, screen } from '../../../test-utils/context-wrapper';
//import App from '../../../App';
import Landing from '../Landing';

test('renders learn react link', () => {
  render(<Landing />); //<- Create Virtual DOM
  const linkElement = screen.getByText(/Login/i); //<- use screen to grab
  expect(linkElement).toBeInTheDocument(); //jest assert
});
