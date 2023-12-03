import * as vscode from 'vscode';
import { functionTemplate } from './utils/functionTemplate';
export const makeFunction = (ide: typeof vscode) => {
  // The code you place here will be executed every time your command is executed
  // Display a message box to the user
  ide.window.showInputBox({ prompt: "Type the function name"})
    .then((functionName) => {
      if (typeof functionName !== 'string') {
        ide.window.showErrorMessage("Function name must be a string");
        return;
      }

      const code = functionTemplate(functionName);

      const editor = ide.window.activeTextEditor;
      if (editor) {
        editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.start, code);
        });

        const newPositionStart = editor.selection.start.translate(1, 2);

        editor.selection = new ide.Selection(newPositionStart, newPositionStart);
      }
    });
  ;
};
