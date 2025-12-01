// validation.js - pure helper logic (unit-testable)
function validateBugPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Payload must be an object');
    return { valid: false, errors };
  }
  if (!payload.title || String(payload.title).trim() === '') {
    errors.push('Title is required');
  } else if (String(payload.title).length > 200) {
    errors.push('Title too long');
  }
  if (payload.status && !['open','in-progress','resolved'].includes(payload.status)) {
    errors.push('Invalid status');
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { validateBugPayload };
