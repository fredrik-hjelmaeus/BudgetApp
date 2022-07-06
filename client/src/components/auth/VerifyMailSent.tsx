import React from "react";

interface VerifyMailSentProps {
  email: string;
  setVerifyStatus: (status: string) => void;
}

function VerifyMailSent({ email, setVerifyStatus }: VerifyMailSentProps) {
  return (
    <React.Fragment>
      <h1>Check your email to verify your account</h1>
      <p>
        If there’s an account associated with {email} you’ll get a link in your inbox to verify your
        account. If you don’t get the link, check your spam folder or{" "}
        <button value="" onClick={() => setVerifyStatus("invalid")}>
          re-enter your email address
        </button>
        . Still need help? Contact us.
      </p>
    </React.Fragment>
  );
}

export default VerifyMailSent;
