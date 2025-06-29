import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditorWindow from './CodeEditorWindow';

// Utility to set viewport size
const setMobileViewport = () => {
  window.innerWidth = 375; // iPhone 12 width
  window.innerHeight = 667;
  window.dispatchEvent(new Event('resize'));
};

describe('CodeEditorWindow', () => {
  beforeEach(() => {
    setMobileViewport();
  });

  test('renders without crashing on mobile view', () => {
    render(<CodeEditorWindow />);
    const editor = screen.getByTestId('code-editor-window');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveStyle({ width: '100%' }); // Optional: assert responsive layout
  });
});