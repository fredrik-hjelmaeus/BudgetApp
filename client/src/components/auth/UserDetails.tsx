import React from "react";

interface UserDetailsProps {
  onSubmitProfile: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  email: string;
}

function UserDetails({ onSubmitProfile, onChange, name, email }: UserDetailsProps) {
  return (
    <form onSubmit={onSubmitProfile}>
      <div className="flexrow">
        <div>
          <label className="form-text label" htmlFor="name">
            Name:
          </label>
        </div>
        <div className="form-text">
          <input
            type="name"
            id="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="flexrow ">
        <div>
          <label className="form-text label" htmlFor="email">
            Email:
          </label>
        </div>
        <div className="form-text">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-dark btn-block my-1" value="register">
        Update Profile
      </button>
    </form>
  );
}

export default UserDetails;
