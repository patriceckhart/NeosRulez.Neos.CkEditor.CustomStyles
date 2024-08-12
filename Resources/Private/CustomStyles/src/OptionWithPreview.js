import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line camelcase
import {SelectBox_Option_MultiLineWithThumbnail, SelectBox_Option_SingleLine} from "@neos-project/react-ui-components";
import styles from "./styles.css"
import SelectBox_Option_MultiLineWithStyle from "./SelectBox_Option_MultiLineWithStyle";

class OptionWithPreview extends PureComponent {
    static propTypes = {
        option: PropTypes.shape({
            label: PropTypes.string.isRequired,
            loaderUri: PropTypes.string.isRequired,
            preview: PropTypes.string,
			backgroundColor: PropTypes.string,
			textColor: PropTypes.string,
        }),
    };

    render() {
        const { option } = this.props;

        return (
			<Fragment>
				{option.backgroundColor &&
					<SelectBox_Option_MultiLineWithStyle
						{...this.props}
						backgroundColor={option.backgroundColor}
						textColor={option.textColor}
						label={option.label}
						className={styles.previewOption}
					/>
				}
				{(option.preview && (!option.backgroundColor && !option.textColor)) &&
					<SelectBox_Option_MultiLineWithThumbnail
						{...this.props}
						imageUri={option.preview}
						label={option.label}
						className={styles.previewOption}
					/>
				}
				{!option.backgroundColor && !option.textColor && !option.preview &&
					<SelectBox_Option_SingleLine
						{...this.props}
						label={option.label}
					/>
				}
			</Fragment>
        );
    }
}

export default OptionWithPreview;
