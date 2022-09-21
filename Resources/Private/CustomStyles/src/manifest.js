import manifest from '@neos-project/neos-ui-extensibility';
import {$get} from 'plow-js';

import InlineStylesEditing from './InlineStylesEditing';
import InlineStyleSelector from './InlineStyleSelector';

manifest('NeosRulez.Neos.CkEditor.CustomStyles', {}, (globalRegistry, {frontendConfiguration}) => {

    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
    const config = ckEditorRegistry.get('config');

    const inlineStyleConfiguration = frontendConfiguration['NeosRulez.Neos.CkEditor.CustomStyles.GlobalStyles'];

    if (inlineStyleConfiguration) {

        Object.keys(inlineStyleConfiguration.presets).forEach((presetIdentifier) => {

            const inlineStylePresetConfiguration = inlineStyleConfiguration.presets[presetIdentifier];

            config.set(`NeosRulez.Neos.CkEditor.CustomStyles:InlineStyles_${presetIdentifier}`, (ckEditorConfiguration, {editorOptions}) => {
                ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
                ckEditorConfiguration.plugins.push(InlineStylesEditing(presetIdentifier, inlineStylePresetConfiguration));
                return ckEditorConfiguration;
            });

            richtextToolbar.set(`inlineStyles_${presetIdentifier}`, {
                component: InlineStyleSelector,
                isVisible: function (editorOptions, formattingUnderCursor) {
                    var isVisible = false;
                    if (editorOptions['customStyles'] !== undefined && editorOptions['customStyles'][presetIdentifier] !== undefined) {
                        isVisible = editorOptions['customStyles'][presetIdentifier];
                    }
                    return isVisible;
                },
                presetIdentifier: presetIdentifier,
                presetConfiguration: inlineStylePresetConfiguration
            });
        });
    }
});
