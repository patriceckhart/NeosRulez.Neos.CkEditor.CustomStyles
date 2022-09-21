import {Plugin} from 'ckeditor5-exports';
import InlineStylesCommand from './InlineStylesCommand';

/**
 * FACTORY FUNCTION for the plugin
 * needs the current preset configuration as parameter.
 */
export default (presetIdentifier, presetConfiguration) =>
    class InlineStylesEditing extends Plugin {
        init() {
            const schema = this.editor.model.schema;
            const optionIdentifiers = Object.keys(presetConfiguration.options);
            const modelAttributeKey = `inlineStyles-${presetIdentifier}`;

            schema.extend(
                '$text',
                {allowAttributes: modelAttributeKey}
            );

            schema.setAttributeProperties(
                modelAttributeKey,
                {isFormatting: true}
            );

            const config = {
                model: {
                    key: modelAttributeKey,
                    values: optionIdentifiers
                },
                view: {}
            };

            optionIdentifiers.forEach(optionIdentifier => {
                const options = presetConfiguration.options[optionIdentifier];
                const {attribute} = options;
                const classes = options.attributeValue || options.cssClasses;

                config.view[optionIdentifier] = {
                    name: 'span',
                    attributes: {[attribute ? attribute : 'class']: classes}
                }
            });

            this.editor.conversion.attributeToElement(config);

            this.editor.commands.add(`inlineStyles:${presetIdentifier}`, new InlineStylesCommand(this.editor, modelAttributeKey));
        }
    };
