import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Environment Setup', () => {
  it('should perform basic arithmetic', () => {
    expect(1 + 1).toBe(2);
  });

  it('should render React components', () => {
    render(<div>Hello Test World</div>);
    expect(screen.getByText('Hello Test World')).toBeInTheDocument();
  });
});
