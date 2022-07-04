import React from "react";

interface ForgotMailInputProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; // weirdness here
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function VerifyMailInput({ email, onChange, onClick, onSubmit }: ForgotMailInputProps) {
  return (
    <React.Fragment>
      <div className="form-container">
        <div className="ForgotMailInput__text">
          Your email needs to be verified before logging in. Please check your email for the
          verification link or enter your email below and submit to resend the link.
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-text">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <input type="submit" value="SEND MAIL" className="btn btn-dark btn-block btn-login" />
        </form>
        <button className="btn btn-outline btn-block" value="" onClick={onClick}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
}

export default VerifyMailInput;
