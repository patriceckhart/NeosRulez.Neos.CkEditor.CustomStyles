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

			const inlineStylePresetConfiguration = inlineStyleConfiguration.presets[presetIdentifier];

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
	} else {
		if (inlineStyleConfiguration.dataSource) {

			const label = inlineStyleConfiguration.dataSource.label;
			const dataSourceIdentifier = inlineStyleConfiguration.dataSource.dataSourceIdentifier;

			let dataSourceModel = {presets: {[dataSourceIdentifier]: {label: label}}}

			fetch(`/neos/service/data-source/${dataSourceIdentifier}`, {method: 'GET', redirect: 'follow', credentials: 'include'})
				.then((response) => response.json())
				.then((result) => {

					let items = [];
					for (let i in result) {
						const item = result[i];
						items[item.value] = item;
					}

					dataSourceModel.presets[dataSourceIdentifier].options = items;

					config.set(`NeosRulez.Neos.CkEditor.CustomStyles:InlineStyles_${dataSourceIdentifier}`, (ckEditorConfiguration, {editorOptions}) => {
						ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
						ckEditorConfiguration.plugins.push(InlineStylesEditing(dataSourceIdentifier, dataSourceModel.presets[dataSourceIdentifier]));
						return ckEditorConfiguration;
					});

					richtextToolbar.set(`inlineStyles_${dataSourceIdentifier}`, {
						component: InlineStyleSelector,
						isVisible: function () {
							return true
						},
						presetIdentifier: dataSourceIdentifier,
						presetConfiguration: dataSourceModel.presets[dataSourceIdentifier]
					});

				})
				.catch((error) => console.error(error));
		}
	}
});
