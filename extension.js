const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Show update notification with support links (one-time per version)
    const currentVersion = '1.0.7';
    const lastNotifiedVersion = context.globalState.get('lastNotifiedVersion');
    
    if (lastNotifiedVersion !== currentVersion) {
        // Show the notification after a short delay to avoid overwhelming users on startup
        setTimeout(() => {
            const message = '🌊 Thanks for using Oceanic Custom! With 350+ downloads, your support means the world. ';
            const supportAction = 'Support Development ☕';
            const dismissAction = 'Maybe Later';

            vscode.window.showInformationMessage(message, supportAction, dismissAction).then(selection => {
                if (selection === supportAction) {
                    vscode.window.showInformationMessage(
                        'Choose your preferred way to support:',
                        'Buy Me a Coffee',
                        'PayPal'
                    ).then(choice => {
                        if (choice === 'Buy Me a Coffee') {
                            vscode.env.openExternal(vscode.Uri.parse('https://www.buymeacoffee.com/facundo.malgieri'));
                        } else if (choice === 'PayPal') {
                            vscode.env.openExternal(vscode.Uri.parse('https://www.paypal.com/donate/?hosted_button_id=LFWM6H4YYAVQC'));
                        }
                    });
                }
            });
        }, 3000); // 3 second delay

        // Mark this version as notified
        context.globalState.update('lastNotifiedVersion', currentVersion);
    }

    // Register command to apply font settings
    let applyFontSettings = vscode.commands.registerCommand('oceanicCustom.applyFontSettings', function () {
        const config = vscode.workspace.getConfiguration();

        // Apply the font settings from your original configuration
        config.update('editor.fontFamily', 'Source Code Pro, Menlo, Monaco, \'Courier New\', monospace', vscode.ConfigurationTarget.Global);
        config.update('editor.fontSize', 18, vscode.ConfigurationTarget.Global);
        config.update('editor.lineHeight', 1.6, vscode.ConfigurationTarget.Global);

        // Apply tree indent settings for better file structure visualization
        config.update('workbench.tree.indent', 20, vscode.ConfigurationTarget.Global);
        config.update('workbench.tree.renderIndentGuides', 'always', vscode.ConfigurationTarget.Global);

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

                // Apply tree indent settings for better file structure visualization
                config.update('workbench.tree.indent', 20, vscode.ConfigurationTarget.Global);
                config.update('workbench.tree.renderIndentGuides', 'always', vscode.ConfigurationTarget.Global);
            }
        }
    });

    context.subscriptions.push(applyFontSettings);
    context.subscriptions.push(onThemeChange);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};