// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { log, showError, showInfo, showWarning } from "./helpers/loggingUtils";
import * as fs from "fs/promises";
import * as path from "path";
import { renderHtml } from "./converter/markdownToHtml";
import { convertHtmlToPdf } from "./converter/htmlToPdf";
import { applyMacros, getFooter, getHeader, getMargins } from "./helpers/pdfUtils";
import {
  generateTempFileName,
  getBaseName,
  getMarkdownDocument,
  getOutputDirectory,
} from "./helpers/extensionUtils";

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Activation message
  log("Extension is now active!");

  // HTML Export Command
  // This command exports the active Markdown document to HTML
  const exportToHtml = vscode.commands.registerCommand(
    "markdownPdfEnhanced.exportToHtml",
    async () => {
      // Log the command execution to the console and show a message in VS Code
      showInfo("Exporting Markdown to HTML...", "Export to HTML command executed");

      // Get the active Markdown document
      // If no active document is found, show an info message and return
      const mdDocument = getMarkdownDocument();
      if (!mdDocument) {
        showInfo(
          "No active Markdown document found. Please open a Markdown file."
        );
        return;
      }

      // Get the Markdown file content, name, and directory
      const markdownContent = mdDocument.getText();
      const outputDir = getOutputDirectory(mdDocument.uri.fsPath);
      const baseName = getBaseName(mdDocument.uri.fsPath);

      const htmlCssPath = await fs.readFile(
        context.asAbsolutePath("dist/assets/stylesheets/htmlStyles.css"),
        "utf-8"
      );

      // Prepare the output file path and content
      const html = renderHtml(markdownContent, htmlCssPath);
      const htmlPath = path.join(outputDir, `${baseName}.html`);

      try {
        // Ensure the output directory exists
        await fs.writeFile(htmlPath, html);
        log(`HTML file written to ${htmlPath}`);
      } catch (error) {
        showError(
          "Failed to write HTML file. Please check the console for details.",
          `Error writing HTML file: ${error}`
        );
        return;
      }

      // Log the completion of the command
      showInfo(
        "Markdown has been exported to HTML successfully!",
        "Export to HTML completed"
      );
    }
  );

  // PDF Export Command
  // This command exports the active Markdown document to PDF, using a temporary HTML file as an intermediary step
  const exportToPdf = vscode.commands.registerCommand(
    "markdownPdfEnhanced.exportToPdf",
    async () => {
      // Log the command execution to the console and show a message in VS Code
      log("Export to PDF command executed");
      showInfo("Exporting Markdown to PDF...");

      // Get the active Markdown document
      // If no active document is found, show an info message and return
      const mdDocument = getMarkdownDocument();
      if (!mdDocument) {
        showInfo(
          "No active Markdown document found. Please open a Markdown file."
        );
        return;
      }

      // Get the Markdown file content, name, and directory
      const markdownContent = mdDocument.getText();
      const outputDir = getOutputDirectory(mdDocument.uri.fsPath);
      const baseName = getBaseName(mdDocument.uri.fsPath);

      const htmlCssPath = await fs.readFile(
        context.asAbsolutePath("dist/assets/stylesheets/htmlStyles.css"),
        "utf-8"
      );

      // Prepare the output file path and content for temporary HTML file
      const html = renderHtml(markdownContent, htmlCssPath, true); // true indicates this is for PDF conversion
      const tempHtmlPath = path.join(outputDir, generateTempFileName());

      // Making the HTML ready for PDF conversion
      try {
        // Ensure the output directory exists
        await fs.writeFile(tempHtmlPath, html);
        log(`Temporary HTML file written to ${tempHtmlPath}`);
      } catch (error) {
        showError(
          "Failed to write temporary HTML file. Please check the console for details.",
          `Error writing temporary HTML file: ${error}`
        );
        return;
      }

      // Prepare the output PDF file path and headers/footers      
      const outputPath = path.join(outputDir, `${baseName}.pdf`);
      const header = applyMacros(getHeader(), baseName);
      const footer = applyMacros(getFooter(), baseName);

      // Convert the temporary HTML file to PDF
      try {
        await convertHtmlToPdf(tempHtmlPath, outputPath, {
          headerTemplate: header,
          footerTemplate: footer,
          displayHeaderFooter: true,
          margin: getMargins(),
        });
        log(`PDF file written to ${outputPath}`);
      } catch (error) {
        showError(
          "Failed to convert HTML to PDF. Please check the console for details.",
          `Error converting HTML to PDF: ${error}`
        );
        return;
      } finally {
        // Clean up the temporary HTML file after conversion
        try {
          await fs.rm(tempHtmlPath);
          log(`Temporary HTML file removed: ${tempHtmlPath}`);
        } catch (cleanupError) {
          showWarning(
            "Failed to remove temporary HTML file. Please check the console for details.",
            `Error removing temporary HTML file: ${cleanupError}`
          );
        }
      }


      // Log the completion of the command
      log("Export to PDF completed");
      showInfo("Markdown has been exported to PDF successfully!");
    }
  );

  // HTML and PDF Export Command
  // This command exports the active Markdown document to both HTML and PDF formats
  const exportToHtmlAndPdf = vscode.commands.registerCommand(
    "markdownPdfEnhanced.exportToHtmlAndPdf",
    async () => {
      // Log the command execution to the console and show a message in VS Code
      log("Export to HTML and PDF command executed");
      showInfo("Exporting Markdown to HTML and PDF...");

      // Get the active Markdown document
      // If no active document is found, show an info message and return
      const mdDocument = getMarkdownDocument();
      if (!mdDocument) {
        showInfo(
          "No active Markdown document found. Please open a Markdown file."
        );
        return;
      }

      // Get the Markdown file content, name, and directory
      const markdownContent = mdDocument.getText();
      const outputDir = getOutputDirectory(mdDocument.uri.fsPath);
      const baseName = getBaseName(mdDocument.uri.fsPath);

      const htmlCssPath = await fs.readFile(
        context.asAbsolutePath("dist/assets/stylesheets/htmlStyles.css"),
        "utf-8"
      );

      // Prepare the output file path and content
      const html = renderHtml(markdownContent, htmlCssPath, true);
      const htmlPath = path.join(outputDir, `${baseName}.html`);

      try {
        // Ensure the output directory exists
        await fs.writeFile(htmlPath, html);
        log(`HTML file written to ${htmlPath}`);
      } catch (error) {
        showError(
          "Failed to write HTML file. Please check the console for details.",
          `Error writing HTML file: ${error}`
        );
        return;
      }

      // Prepare the output PDF file path and headers/footers      
      const outputPath = path.join(outputDir, `${baseName}.pdf`);
      const header = applyMacros(getHeader(), baseName);
      const footer = applyMacros(getFooter(), baseName);

      // Convert the temporary HTML file to PDF
      try {
        await convertHtmlToPdf(htmlPath, outputPath, {
          headerTemplate: header,
          footerTemplate: footer,
          displayHeaderFooter: true,
          margin: getMargins(),
        });
        log(`PDF file written to ${outputPath}`);
      } catch (error) {
        showError(
          "Failed to convert HTML to PDF. Please check the console for details.",
          `Error converting HTML to PDF: ${error}`
        );
        return;
      } 

      // Log the completion of the command
      log("Export to HTML and PDF completed");
      showInfo("Markdown has been exported to HTML and PDF successfully!");
    }
  );
  
  // Register the commands with the context
  context.subscriptions.push(exportToHtml, exportToPdf, exportToHtmlAndPdf);
}

// This method is called when your extension is deactivated
export function deactivate() {
  // Log the deactivation of the extension
  console.log("Markdown PDF Enhanced extension is now deactivated.");
}
