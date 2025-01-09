export type FormSubmitActionState =
  | {
      status: "success";
      message?: string;
      [x: string | number | symbol]: unknown;
    }
  | {
      status: "error";
      message: string;
      [x: string | number | symbol]: unknown;
    }
  | null;

export type FormSubmitAction<T> = (
  previousState: FormSubmitActionState,
  values: T
) => Promise<FormSubmitActionState>;
