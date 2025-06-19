import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditorWindow from './CodeEditorWindow';

describe('CodeEditorWindow', () => {
  test('renders without crashing', () => {
    render(<CodeEditorWindow />);
    // You can add more specific queries based on your component's content
    // For now, just check if the component renders
    expect(screen.getByTestId('code-editor-window')).toBeInTheDocument();
  });
});
