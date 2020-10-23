import React from 'react';

function UserChangePassword({ ExpandChangePassword, currentPassword, onChange, password, password2, onSubmitPassword }) {
  return (
    <form onSubmit={onSubmitPassword}>
      <div className={!ExpandChangePassword ? 'form__inputOFF' : 'form-text'}>
        <input placeholder='Current Password' type='password' name='currentPassword' value={currentPassword} onChange={onChange} required />
      </div>
      <div className={!ExpandChangePassword ? 'form__inputOFF' : 'form-text'}>
        <input placeholder='New Password' type='password' name='password' value={password} onChange={onChange} required />
      </div>
      <div className={!ExpandChangePassword ? 'form__inputOFF' : 'form-text'}>
        <input
          placeholder='Confirm New Password'
          type='password'
          name='password2'
          value={password2}
          onChange={onChange}
          required
          minLength='6'
        />
      </div>

      <button type='submit' className={!ExpandChangePassword ? 'form__inputOFF' : 'btn btn-dark btn-block my-1'} value='register'>
        Update Password
      </button>
    </form>
  );
}

export default UserChangePassword;
