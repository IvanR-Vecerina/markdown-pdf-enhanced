import MarkdownIt from "markdown-it";
import { full as emoji } from 'markdown-it-emoji';

export function renderMarkdown(markdown: string): string {
  
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str: string, lang: string): string => {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${str}</div>`;
      }
      return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
    }
  });
  const taskLists = require('markdown-it-task-lists');

  md.use(emoji)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-container'), 'info')
    .use(require('markdown-it-container'), 'spoiler', {

  validate: function(params: string) {
    return RegExp(/^spoiler\s+(.*)$/).exec(params.trim());
  },

  render: function (tokens: any[], idx: number) {
    const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

    } else {
      // closing tag
      return '</details>\n';
    }
  }
})
    .use(require('markdown-it-container'), 'warning')
    .use(taskLists)
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('@vscode/markdown-it-katex').default)
;

  const body = md.render(markdown);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Markdown PDF</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"/>
      <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.esm.min.mjs';
      </script>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
        }
      </style>
    </head>
    <body>
      ${body}
    </body>
    </html>
  `;
}
