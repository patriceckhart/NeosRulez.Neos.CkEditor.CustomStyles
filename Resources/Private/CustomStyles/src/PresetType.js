import PropTypes from 'prop-types';

function attributeValueOrCssClasses(props, propName, componentName) {
    if (props[propName] && typeof props[propName] !== 'string') {
        return new Error(`Prop '${propName}' must be a string.`);
    }
    if (!props.attributeValue && !props.cssClasses) {
        return new Error(`Either prop 'attributeValue' or 'cssClasses' must be supplied to ${componentName}.`);
    }
}

export default PropTypes.shape({
    label: PropTypes.string.isRequired,

    options: PropTypes.objectOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        attribute: PropTypes.string,
        attributeValue: attributeValueOrCssClasses,
        cssClasses: attributeValueOrCssClasses,
    })),
});
