import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {$transform} from 'plow-js';
import PresetType from './PresetType';

import {selectors} from '@neos-project/neos-ui-redux-store';
import * as CkEditorApi from '@neos-project/neos-ui-ckeditor5-bindings';
import OptionWithPreview from "./OptionWithPreview";

import styles from "./styles.css";

@connect($transform({
    formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor
}))
export default class InlineStyleSelector extends PureComponent {
    static propTypes = {
        presetIdentifier: PropTypes.string.isRequired,
        presetConfiguration: PresetType.isRequired,

        formattingUnderCursor: PropTypes.object
    };

    constructor(...args) {
        super(...args);

        this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    render() {
        const optionsForSelect = Object.entries(this.props.presetConfiguration.options)
            .map(([optionIdentifier, optionConfiguration]) => ({
                value: optionIdentifier,
                label: optionConfiguration.label,
                icon: optionConfiguration.icon,
                preview: optionConfiguration.preview,
				backgroundColor: optionConfiguration.backgroundColor,
				textColor: optionConfiguration.textColor,
				group: optionConfiguration.group,
            }));

        if (optionsForSelect.length === 0) {
            return null;
        }

        const currentValue = this.props.formattingUnderCursor[`inlineStyles:${this.props.presetIdentifier}`];

        return (
			<SelectBox
				options={optionsForSelect}
				value={currentValue}
				allowEmpty={true}
				placeholder={this.props.presetConfiguration.label}
				onValueChange={this.handleOnSelect}
				ListPreviewElement={OptionWithPreview}
				className={styles.customStyles}
			/>
        );
    }

    handleOnSelect(optionIdentifier) {
        CkEditorApi.executeCommand(
            `inlineStyles:${this.props.presetIdentifier}`,
            {value: optionIdentifier}
        );
    }
}
