export interface ErrorParams {
  key: string;
  description?: string;
}

export class CustomException {
  constructor(private readonly params: ErrorParams) {}

  public getParams() {
    return this.params;
  }
}
