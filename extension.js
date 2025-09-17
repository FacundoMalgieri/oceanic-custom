const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Register command to apply font settings
    let applyFontSettings = vscode.commands.registerCommand('oceanicCustom.applyFontSettings', function () {
        const config = vscode.workspace.getConfiguration();
        
        // Apply the font settings from your original configuration
        config.update('editor.fontFamily', 'Source Code Pro, Menlo, Monaco, \'Courier New\', monospace', vscode.ConfigurationTarget.Global);
        config.update('editor.fontSize', 18, vscode.ConfigurationTarget.Global);
        config.update('editor.lineHeight', 1.6, vscode.ConfigurationTarget.Global);
        
        vscode.window.showInformationMessage('Oceanic Custom font settings applied!');
    });

    // Auto-apply font settings when the theme is activated (if enabled)
    let onThemeChange = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
            const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
            const applyFonts = vscode.workspace.getConfiguration().get('oceanicCustom.applyFontSettings');
            
            if (currentTheme === 'Oceanic Custom' && applyFonts) {
                // Apply font settings automatically when theme is selected
                const config = vscode.workspace.getConfiguration();
                config.update('editor.fontFamily', 'Source Code Pro, Menlo, Monaco, \'Courier New\', monospace', vscode.ConfigurationTarget.Global);
                config.update('editor.fontSize', 18, vscode.ConfigurationTarget.Global);
                config.update('editor.lineHeight', 1.6, vscode.ConfigurationTarget.Global);
            }
        }
    });

    context.subscriptions.push(applyFontSettings);
    context.subscriptions.push(onThemeChange);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};