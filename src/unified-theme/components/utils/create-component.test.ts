import { createComponent, HTMLElementTag } from './create-component.js';
import { describe, it, expect } from 'vitest';

describe('createComponent', () => {
  it('should return a function when called with a valid HTML tag', () => {
    const DivComponent = createComponent('div');
    expect(typeof DivComponent).toBe('function');
  });

  it('should create different components for different tags', () => {
    const DivComponent = createComponent('div');
    const SpanComponent = createComponent('span');

    expect(DivComponent).not.toBe(SpanComponent);
  });

  it('should work with various HTML elements', () => {
    const commonTags: HTMLElementTag[] = ['div', 'span', 'img', 'button', 'h1', 'p'];

    commonTags.forEach(tag => {
      const Component = createComponent(tag);
      expect(typeof Component).toBe('function');
    });
  });

  it('should create components that accept props', () => {
    const DivComponent = createComponent('div');
    const props = { className: 'test', id: 'test-id' };

    // If props don't work, this would throw or fail
    const result = DivComponent(props);
    expect(result).toBeDefined();
  });
});
