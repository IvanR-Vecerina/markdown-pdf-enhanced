import MarkdownIt from "markdown-it";
import { full as emoji } from "markdown-it-emoji";
import {
  anchorSlugify,
  renderSpoiler,
  mermaidFence,
  RenderHtmlTemplate,
} from "../helpers/htmlUtils";
import { getConfig } from "../helpers/extensionUtils";

export function renderHtml(markdown: string, htmlCssPath: string, forPDF?: boolean): string {
  const md = prepareMarkdownIt();

  md.use(require("markdown-it-container"), "spoiler", renderSpoiler(md, forPDF ?? false));

  const mermaidPath: string =
    getConfig("externalModules.mermaidPath") ??
    "https://cdn.jsdelivr.net/npm/mermaid@latest/dist/mermaid.esm.min.mjs";
  const katexCssPath: string =
    getConfig("styles.katexCssPath") ??
    "https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css";
  const htmlStylesheetPath: string =
    getConfig("styles.customHtmlStylesheet") ??
    htmlCssPath;

  return RenderHtmlTemplate(
    markdown,
    md,
    katexCssPath,
    mermaidPath,
    htmlStylesheetPath
  );
}

function prepareMarkdownIt(): MarkdownIt {
  // Create a new MarkdownIt instance with custom options
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  // Load the task lists plugin
  const taskLists = require("markdown-it-task-lists");

  // Load the anchor plugin for generating anchors for headings
  const anchor = require("markdown-it-anchor").default;

  // Save a reference to the default fence renderer
  const defaultFence =
    md.renderer.rules.fence ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  // Escape helper
  const escapeHtml = md.utils.escapeHtml;

  // Custom fence renderer to handle Mermaid diagrams
  md.renderer.rules.fence = (tokens, idx, options, env, self) =>
    mermaidFence(tokens, idx, options, env, self, escapeHtml, defaultFence);

  // Use all necessary plugins
  md.use(emoji)
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-container"), "tip")
    .use(require("markdown-it-container"), "info")
    .use(require("markdown-it-container"), "warning")
    .use(require("markdown-it-container"), "page-break")
    .use(anchor, { slugify: anchorSlugify })
    .use(taskLists)
    .use(require("markdown-it-sub"))
    .use(require("markdown-it-sup"))
    .use(require("@vscode/markdown-it-katex").default)
    .use(require("markdown-it-plantuml"));

  return md;
}
