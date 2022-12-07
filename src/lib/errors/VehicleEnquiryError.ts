/* eslint-disable functional/no-this-expression */
type ResponseError = {
  readonly title: string;
  readonly status?: string | number;
  readonly code?: string;
  readonly detail?: string;
};

type APIError = {
  readonly status: string;
  readonly message: string;
};

export type ErrorResponse = {
  readonly errors?: readonly ResponseError[];
};

const isResponseError = (errors: unknown): errors is ErrorResponse =>
  typeof errors === 'object' &&
  errors !== null &&
  'errors' in errors &&
  Array.isArray(
    (
      errors as {
        readonly errors?: readonly unknown[];
      }
    )?.errors
  );

const isAPIError = (error: unknown): error is APIError =>
  typeof error === 'object' && error !== null && 'message' in error;

// eslint-disable-next-line functional/no-class
export class VehicleEnquiryError extends Error {
  readonly status?: string;
  readonly code?: string;
  readonly detail?: string;
  readonly allErrors?: readonly ResponseError[];

  constructor(
    errors: unknown | readonly unknown[],
    { status }: { readonly status?: number } = {}
  ) {
    if (isAPIError(errors)) {
      super(errors.message);
      this.status = status?.toString();
      return;
    }

    if (isResponseError(errors)) {
      const { errors: errorsArray } = errors;

      if (!errorsArray) {
        super('Unknown error: ' + JSON.stringify(errors));
        return;
      }

      const [error] = errorsArray;

      const { title, code, detail, status } = error;

      super(title);

      this.status = status?.toString();
      this.code = code;
      this.detail = detail;
      this.allErrors = errorsArray;
      return;
    }

    super('Unknown error: ' + JSON.stringify(errors));
  }
}
