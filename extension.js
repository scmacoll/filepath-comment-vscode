const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Extension "my-vscode-extension" is now active!');

    let disposable = vscode.commands.registerCommand('my-vscode-extension.addFilePathComment', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const filePath = path.relative(vscode.workspace.rootPath, document.uri.fsPath);
            const fileExtension = path.extname(document.uri.fsPath).slice(1);
            const languageComment = getCommentForLanguage(fileExtension);

            const comment = `${languageComment} File path: ${filePath}\n\n`;

            editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(0, 0), comment);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

function getCommentForLanguage(extension) {
    const languageComments = {
        'js': '//',
        'jsx': '//',
        'ts': '//',
        'tsx': '//',
        'py': '#',
        'java': '//',
        'cpp': '//',
        'c': '//',
        'cs': '//',
        'go': '//',
        'rb': '#',
        'php': '//',
        'swift': '//',
        'sh': '#',
        'rs': '//',
        'kt': '//',
    };

    return languageComments[extension] || '//';
}

module.exports = {
    activate,
    deactivate
};