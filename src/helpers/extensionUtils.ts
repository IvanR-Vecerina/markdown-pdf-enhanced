import * as vscode from "vscode";
import { showError, showWarning } from "./loggingUtils";
import * as path from "path";



/**
 * Retrieves the configuration value for the specified key from the extension's settings.
 * @param key The configuration key to retrieve.
 * @returns The configuration value, or undefined if not set.
 */
export function getConfig<T>(key: string): T | undefined {
  return vscode.workspace.getConfiguration("markdownPdfEnhanced").get<T>(key);
}

/**
 * Gets the base name of the document path, excluding the file extension.
 * @param docPath The full path of the document.
 * @return The base name of the document.
 */
export function getBaseName(docPath: string): string {
  return path.basename(docPath, path.extname(docPath));
}

/**
 * Gets the output directory for the document, which is the directory containing the document.
 * @param docPath The full path of the document.
 * @return The output directory path.
 */
export function getOutputDirectory(docPath: string): string {
  return path.dirname(docPath);
}

/**
 * Generates a temporary file name based on the current timestamp.
 * @returns A string representing the temporary file name.
 */
export function generateTempFileName(): string {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `markdown-pdf-enhanced-${timestamp}-${randomSuffix}.html`;
}

/**
 * Retrieves the active Markdown document from the editor.
 * If no active editor is found or the active document is not a Markdown file, it shows an error message.
 * If the document has unsaved changes, it shows a warning message.
 * @returns The active Markdown document if available, otherwise undefined.
 */
export function getMarkdownDocument(): vscode.TextDocument | undefined {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    showError("No active editor found. Please open a Markdown file.");
    return undefined;
  }

  if (editor.document.languageId !== "markdown") {
    showError("The active file is not a Markdown file.");
    return undefined;
  }

  if (editor.document.isDirty) {
    showWarning(
      "The active Markdown file has unsaved changes. They may not be reflected in the conversion."
    );
  }

  return editor.document;
}
