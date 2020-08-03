import React from 'react';

function ForgotMailInput({ email, onChange, onClick, onSubmit }) {
  return (
    <React.Fragment>
      <div>Enter the email you use for your BudgetApp account</div>
      <div className='form-container'>
        <form onSubmit={onSubmit}>
          <div className='form-text'>
            <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} required />
          </div>

          <input type='submit' value='SEND MAIL' className='btn btn-dark btn-block btn-login' />
        </form>
        <button className='btn btn-outline btn-block' value='' onClick={onClick}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
}

export default ForgotMailInput;
