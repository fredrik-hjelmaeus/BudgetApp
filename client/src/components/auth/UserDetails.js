import React from 'react';

function UserDetails({ onSubmitProfile, onChange, name, email }) {
  return (
    <form onSubmit={onSubmitProfile}>
      <div className='flexrow'>
        <div>
          <label className='form-text label' for='name'>
            Name:
          </label>
        </div>
        <div className='form-text'>
          <input type='name' placeholder='Name' name='name' value={name} onChange={onChange} required />
        </div>
      </div>
      <div className='flexrow '>
        <div>
          <label className='form-text label' for='email'>
            Email:
          </label>
        </div>
        <div className='form-text'>
          <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} required />
        </div>
      </div>
      <button type='submit' className='btn btn-dark btn-block my-1' value='register'>
        Update Profile
      </button>
    </form>
  );
}

export default UserDetails;
