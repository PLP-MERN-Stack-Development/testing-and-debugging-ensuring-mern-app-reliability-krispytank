const { validateBugPayload } = require('../../src/utils/validation');

describe('validateBugPayload', () => {
  test('returns invalid when payload is not object', () => {
    const result = validateBugPayload(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Payload must be an object');
  });

  test('valid minimal payload', () => {
    const result = validateBugPayload({ title: 'A bug' });
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('reject invalid status', () => {
    const result = validateBugPayload({ title: 't', status: 'done' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid status');
  });

  test('reject empty title', () => {
    const result = validateBugPayload({ title: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Title is required');
  });
});
