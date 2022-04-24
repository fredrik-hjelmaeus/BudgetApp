import React from "react";

function ForgotMailSent({ email }: { email: string }) {
  return (
    <React.Fragment>
      <h1>Check your email to reset your password</h1>
      <p>
        If there’s an account associated with {email} you’ll get a link in your inbox to reset your
        password. If you don’t get the link, check your spam folder or re-enter your email address.
        Still need help? Contact us.
      </p>
    </React.Fragment>
  );
}

export default ForgotMailSent;
