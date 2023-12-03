import * as vscode from 'vscode';
import { functionTemplate } from '../utils/functionTemplate';
import { testTemplate } from '../utils/testTemplate';
import { FileMeta } from './FileMeta';
import { FilePosition } from './FilePosition';
import { createFile } from './createFile';

export const addNewTsFile = async (ide: typeof vscode) => {
  try {
    const activatedDirectory = await new FilePosition(ide).get();

    if (typeof activatedDirectory !== 'string') {
      ide.window.showErrorMessage('No workspace folder found for current file.');
      return;
    }
    
    const fileName = await ide.window.showInputBox({ prompt: "Type the typescript file name. If you don't input ext, set default to .ts"});
  
    if (!FileMeta.satisfiedBy(fileName)) {
      ide.window.showErrorMessage("File name must be a string or at least 1 character");
      return;
    }

    const testFileOption = await vscode.window.showQuickPick([{
      label: 'Yes',
    }, {
      label: 'No',
    }], {
      placeHolder: 'make a test file?',
      canPickMany: false,
    });

    const fileMeta = new FileMeta({
      directory: activatedDirectory,
      fileName,
    });

    const {path, ext} = fileMeta.make();

    fileMeta.addData({
      fileName: `${path}${ext}`,
      template: functionTemplate(fileName),
    });

    const shouldMakeTestFile = testFileOption?.label === 'Yes';
    if (shouldMakeTestFile) {
      fileMeta.addData({
        fileName: `${path}.spec.ts`,
        template: testTemplate(fileName),
      });
    }

    fileMeta.data().forEach(({ fileName, template }) => {
      createFile({
        fileName,
        template,
      });
    });
  } catch (error) {
    ide.window.showErrorMessage((error as Error).message);
  }
};

