import * as vscode from "vscode";

/**
 * Prepends a specific prefix to a message.
 * @param message - The message to prepend the prefix to.
 * @returns The message with the prefix.
 */
function prependMessage(message: string): string {
  return `[Markdown PDF Enhanced] ${message}`;
}

/**
 * Logs a message to the console with a specific prefix.
 * @param message - The message to log.
 */
export function log(message: string) {
  console.log(prependMessage(message));
}

/**
 * Shows an information message to the user and logs it to the console.
 * @param message - The message to show.
 * @param logMessage - Optional more detailed message to log to the console.
 */
export function showInfo(message: string, logMessage?: string) {
  vscode.window.showInformationMessage(prependMessage(message));
  logMessage ? console.info(prependMessage(logMessage)) : console.info(prependMessage(message));
}

/**
 * Shows an error message to the user and logs it to the console.
 * @param message - The error message to show.
 * @param logMessage - Optional more detailed message to log to the console.
 */
export function showError(message: string, logMessage?: string) {
  vscode.window.showErrorMessage(prependMessage(message));
  logMessage ? console.error(prependMessage(logMessage)) : console.error(prependMessage(message));
}

/**
 * Shows a warning message to the user and logs it to the console.
 * @param message - The warning message to show.
 * @param logMessage - Optional more detailed message to log to the console.
 */
export function showWarning(message: string, logMessage?: string) {
  vscode.window.showWarningMessage(prependMessage(message));
  logMessage ? console.warn(prependMessage(logMessage)) : console.warn(prependMessage(message));
}
