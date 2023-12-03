import * as vscode from 'vscode';

export class FilePosition {
  
  constructor(
    private readonly ide: typeof vscode,
  ) {}

  async get() {
    return this.getCurrentDirectoryPath();
  }

  private getCurrentDirectoryPath() {
    const activeTextEditor = vscode.window.activeTextEditor;

    if (!activeTextEditor) {
      vscode.window.showErrorMessage('No active text editor or workspace folder.');
      return;
    }

    const currentFilePath = activeTextEditor.document.fileName;
    const currentFileDirectory = currentFilePath.split('/').slice(0, -1).join('/');

    if (!currentFileDirectory) {
      vscode.window.showErrorMessage('No workspace folder found for current file.');
      return;
    }

    return currentFileDirectory;
  }
}
