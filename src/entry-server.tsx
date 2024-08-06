import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import App from '@/App.tsx';

export function render() {
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <App />
    </StyleSheetManager>,
  );
  const styleTags = sheet.getStyleTags();
  sheet.seal();
  return { html, styleTags };
}
