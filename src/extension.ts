// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import * as fs from 'fs/promises';
//import * as path from 'path';
//import { renderMarkdown } from './converter/markdownToHtml';

// This method is called when the extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// This line of code will only be executed once when your extension is activated
	console.log('Extension: "markdown-pdf-enhanced" is now active!');

	// The command has been defined in the package.json file
	// Below is the implementation
	const disposable = vscode.commands.registerCommand('markdown-pdf-enhanced.convert', async () => {
		const editor = vscode.window.activeTextEditor;

		// Simple check that a markdown file is open in the active editor.
		if (!editor || editor.document.languageId !== 'markdown') {
			vscode.window.showErrorMessage('Please open a Markdown file to convert.');
			return;
		}

		// Get the markdown content to convert
		/*const markdownContent = editor.document.getText();

		vscode.window.showInformationMessage("Conversion to PDF started...");

		const html = renderMarkdown(markdownContent);
		const tempHtmlPath = path.join( path.dirname(editor.document.uri.fsPath), "shrfgffusezdfgusrwefsd.html");

		await fs.writeFile(tempHtmlPath, html);*/

		const outputName = editor.document.fileName.concat(".pdf");
		const outputPath = vscode.Uri.joinPath(editor.document.uri, outputName);


	    vscode.window.showInformationMessage(`PDF generated: ${outputPath.fsPath}`);

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
