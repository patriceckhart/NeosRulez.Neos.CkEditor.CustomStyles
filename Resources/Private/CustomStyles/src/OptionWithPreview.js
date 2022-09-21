import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line camelcase
import { SelectBox_Option_MultiLineWithThumbnail } from "@neos-project/react-ui-components";
import styles from "./styles.css"

class OptionWithPreview extends PureComponent {
    static propTypes = {
        option: PropTypes.shape({
            label: PropTypes.string.isRequired,
            loaderUri: PropTypes.string.isRequired,
            preview: PropTypes.string,
        }),
    };

    render() {
        const { option } = this.props;

        return (
            <SelectBox_Option_MultiLineWithThumbnail
                {...this.props}
                imageUri={option.preview}
                label={option.label}
                className={styles.previewOption}
            />
        );
    }
}

export default OptionWithPreview;
