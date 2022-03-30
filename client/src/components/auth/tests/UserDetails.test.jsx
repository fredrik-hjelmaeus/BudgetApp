import { fireEvent, render, screen } from '../../../test-utils/context-wrapper';
import UserDetails from '../UserDetails';

// unit test user details component
describe('UserDetails', () => {
  // props
  const onSubmitProfile = jest.fn();
  const name = 'John Doe';
  const email = 'john@email.com';
  const onChange = jest.fn();

  test('should render with props', () => {
    render(<UserDetails onSubmitProfile={onSubmitProfile} name={name} email={email} onChange={onChange} />);
    expect(screen.getByLabelText(/name:/i)).toHaveValue(name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(email);
  });

  test('should call onSubmitProfile on submit', () => {
    render(<UserDetails onSubmitProfile={onSubmitProfile} name={name} email={email} onChange={onChange} />);
    const form = screen.getByRole('button', { name: /update/i });
    fireEvent.submit(form);
    expect(onSubmitProfile).toHaveBeenCalledTimes(1);
  });

  test('should call onChange on change', () => {
    render(<UserDetails onSubmitProfile={onSubmitProfile} name={name} email={email} onChange={onChange} />);
    const input = screen.getByLabelText(/name:/i);
    fireEvent.change(input, { target: { value: 'Change' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should have required fields', () => {
    render(<UserDetails onSubmitProfile={onSubmitProfile} name={'ok'} email={''} onChange={onChange} />);
    const submitBtn = screen.getByRole('button', { name: /update/i });
    fireEvent.submit(submitBtn);
    expect(screen.getByLabelText(/name:/i)).toHaveValue('ok');
    expect(screen.getByLabelText(/name:/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');
  });
});
