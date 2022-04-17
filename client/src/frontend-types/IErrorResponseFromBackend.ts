export interface IErrorResponseFromBackend {
  err: {
    response: {
      data: {
        errors: [{ msg: string }];
      };
    };
  };
}
