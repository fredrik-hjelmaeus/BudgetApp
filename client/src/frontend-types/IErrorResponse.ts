export interface IErrorResponse {
  errors: IError[];
}

export interface IError {
  location?: string;
  msg: string;
  param?: string;
  value?: string;
}

// In response from backend you get a JSON object with the following properties:
// {
//   "errors": [
//     {
//       "location": "body",
//       "msg": "Invalid email or password",
//       "param": "email",
//       "value": "
//     }
//   ]
// }

// When we dispatch the above JSON object to the reducer, it will look like this:
//  [
//   { location: "body", msg: "Invalid email or password", param: "email", value: "" }
//   { location: "body", msg: "Invalid email or password", param: "email", value: "" }
//   { location: "body", msg: "Invalid email or password", param: "email", value: "" }
//  ]

// Conclusion is that we recieve IErrorResponse and send it to reducer as IError[] without
// the errors: from IErrorResponse
