import MarkdownIt from "markdown-it";
import { full as emoji } from 'markdown-it-emoji';

export function renderMarkdown(markdown: string): string {
  
		console.log('HTML 1');
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
		console.log('HTML 2');
  const taskLists = require('markdown-it-task-lists');

		console.log('HTML 3');
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

		console.log('HTML 4');
  const body = md.render(markdown);

		console.log('HTML 5');
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Markdown PDF</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"/>
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
