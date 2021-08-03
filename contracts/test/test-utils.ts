export const skipDescribeIf = (
  condition: boolean
): Mocha.PendingSuiteFunction => (condition ? describe.skip : describe);
