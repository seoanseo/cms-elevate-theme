import cx from './classnames.js';
import { describe, it, expect } from 'vitest';

describe('cx', () => {
  it('should join string arguments with spaces', () => {
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should filter out non-string arguments', () => {
    expect(cx('foo', null, 'bar', undefined, 'baz', 0, false)).toBe('foo bar baz');
  });

  it('should flatten arrays', () => {
    expect(cx(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(cx('foo', ['bar', 'baz'])).toBe('foo bar baz');
  });

  it('should handle nested arrays', () => {
    expect(cx(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('should trim whitespace', () => {
    expect(cx('  foo  ', 'bar', '  baz  ')).toBe('foo bar baz');
  });

  it('should return empty string for no arguments', () => {
    expect(cx()).toBe('');
  });

  it('should return empty string for non-string arguments only', () => {
    expect(cx(null, undefined, false, 0)).toBe('');
  });

  it('should handle object-like strings properly', () => {
    expect(cx('[object Object]', 'foo')).toBe('[object Object] foo');
  });

  it('Should handle && operator', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable && 'foo', FalseVariable && 'bar')).toBe('foo');
  });

  it('Should handle || operator', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable || 'foo', FalseVariable || 'bar')).toBe('bar');
  });

  it('Should handle && and || operators', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable && 'foo', FalseVariable || 'bar')).toBe('foo bar');
  });

  it('should handle empty strings after trimming', () => {
    expect(cx('foo', '   ', 'bar', '    ', 'baz')).toBe('foo bar baz');
  });

  it('should support object syntax with boolean values', () => {
    expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should support object syntax with truthy/falsy values', () => {
    expect(cx({ foo: 1, bar: 0, baz: 'truthy', qux: '' })).toBe('foo baz');
  });

  it('should handle mix of strings and objects', () => {
    expect(cx('static', { conditional: true, disabled: false })).toBe('static conditional');
  });

  it('should handle mix of arrays and objects', () => {
    expect(cx(['one', 'two'], { three: true, four: false })).toBe('one two three');
  });

  it('should handle arrays and objects and strings', () => {
    expect(cx(['one', 'two'], { three: true, four: false }, 'five')).toBe('one two three five');
  });

  it('should handle empty objects', () => {
    expect(cx({})).toBe('');
  });

  it('should trim keys in objects', () => {
    expect(cx({ '  foo  ': true, 'bar  ': true })).toBe('foo bar');
  });
});
