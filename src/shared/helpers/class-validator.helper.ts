import { ValidationError } from 'class-validator';

export function transformErrorsToRecord(
  errors: ValidationError[],
): Record<string, string> {
  const errorRecord: Record<string, string> = {};

  function extractErrors(validationErrors: ValidationError[]) {
    validationErrors.forEach((error) => {
      if (error.children && error.children.length > 0) {
        extractErrors(error.children);
      } else {
        const { property, constraints } = error;
        if (property && constraints) {
          errorRecord[property] = Object.values(constraints).join(', ');
        }
      }
    });
  }

  extractErrors(errors);

  return errorRecord;
}
