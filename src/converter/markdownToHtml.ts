import MarkdownIt from "markdown-it";

export function renderMarkdown(markdown: string): string {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  md.use(require("markdown-it-emoji"))
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-anchor"))
    .use(require("markdown-it-container"), "info")
    .use(require("markdown-it-container"), "warning")
    .use(require("markdown-it-sub"))
    .use(require("markdown-it-sup"))
    .use(require("markdown-it-katex"));

  const body = md.render(markdown);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Markdown to PDF</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      <style>
        body { font-family: sans-serif; margin: 2rem; }
        pre, code { background-color: #f4f4f4; padding: 0.5rem; border-radius: 5px; }
        .katex-display { margin: 1em 0; }
      </style>
    </head>
    <body>${body}</body>
    </html>
  `;
}
