import * as vscode from 'vscode';

type CreateFileParams = {
  fileName: string;
  template: string;
};

export const createFile = ({ fileName, template }: CreateFileParams) => {
  const workspaceEdit = new vscode.WorkspaceEdit();
  const uri = vscode.Uri.file(fileName);

  workspaceEdit.createFile(uri, { ignoreIfExists: true });

  workspaceEdit.insert(uri, new vscode.Position(0, 0), template);

  vscode.workspace.applyEdit(workspaceEdit).then((success) => {
    if (success) {
      vscode.window.showTextDocument(uri);
    } else {
      vscode.window.showErrorMessage(`Failed to create file: ${fileName}`);
    }
  });
};
