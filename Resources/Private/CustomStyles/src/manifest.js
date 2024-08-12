import manifest from '@neos-project/neos-ui-extensibility';

import InlineStylesEditing from './InlineStylesEditing';
import InlineStyleSelector from './InlineStyleSelector';

manifest('NeosRulez.Neos.CkEditor.CustomStyles', {}, (globalRegistry, {frontendConfiguration}) => {

	const ckEditorRegistry = globalRegistry.get('ckEditor5');
	const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
	const config = ckEditorRegistry.get('config');

	const inlineStyleConfiguration = frontendConfiguration['NeosRulez.Neos.CkEditor.CustomStyles.GlobalStyles'];

	if (inlineStyleConfiguration.presets && Object.keys(inlineStyleConfiguration.presets).length > 0) {
		Object.keys(inlineStyleConfiguration.presets).forEach((presetIdentifier) => {

			let inlineStylePresetConfiguration = inlineStyleConfiguration.presets[presetIdentifier];

			if(inlineStyleConfiguration.presets[presetIdentifier].dataSourceIdentifier) {

				fetch(`/neos/service/data-source/${inlineStyleConfiguration.presets[presetIdentifier].dataSourceIdentifier}`, {method: 'GET', redirect: 'follow', credentials: 'include'})
					.then((response) => response.json())
					.then((result) => {

						let items = [];
						for (let i in result) {
							const item = result[i];
							items[item.value] = item;
						}

						inlineStylePresetConfiguration.options = items;

					})
					.catch((error) => console.error(error));

			}

			config.set(`NeosRulez.Neos.CkEditor.CustomStyles:InlineStyles_${presetIdentifier}`, (ckEditorConfiguration, {editorOptions}) => {
				ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
				ckEditorConfiguration.plugins.push(InlineStylesEditing(presetIdentifier, inlineStylePresetConfiguration));
				return ckEditorConfiguration;
			});

			richtextToolbar.set(`inlineStyles_${presetIdentifier}`, {
				component: InlineStyleSelector,
				isVisible: function (editorOptions) {
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
