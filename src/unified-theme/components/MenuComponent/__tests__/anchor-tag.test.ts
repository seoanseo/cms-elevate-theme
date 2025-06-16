import { describe, it, expect } from 'vitest';
import { getAnchorFromUrl } from '../MenuItemComponent.js';

describe('getAnchorFromUrl', () => {
  it('extracts hash from a full URL', () => {
    expect(getAnchorFromUrl('https://example.com/page#section')).toBe('#section');
  });

  it('extracts hash from a relative URL', () => {
    expect(getAnchorFromUrl('/page#section')).toBe('#section');
  });

  it('returns empty string for URL without hash', () => {
    expect(getAnchorFromUrl('https://example.com/page')).toBe('');
  });

  it('returns the hash when input is just a hash', () => {
    expect(getAnchorFromUrl('#section')).toBe('#section');
  });

  it('returns empty string for invalid URL without hash', () => {
    expect(getAnchorFromUrl('not-a-url')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(getAnchorFromUrl('')).toBe('');
  });
});
