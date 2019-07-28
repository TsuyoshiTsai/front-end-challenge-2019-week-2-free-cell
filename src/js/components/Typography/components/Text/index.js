import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '../Typography'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

const alignPropType = PropTypes.oneOf(['auto', 'flex-start', 'center', 'flex-end', 'baseline', 'stretch'])
const unitPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string])
const colorPropType = PropTypes.oneOf([
  'inherit',
  'primary-light',
  'primary',
  'primary-dark',
  'white',
  'gray-lightest',
  'gray-lighter',
  'gray-light',
  'gray',
  'gray-dark',
  'gray-darker',
  'gray-darkest',
])
export const propTypes = {
  prefix: PropTypes.node,
  prefixAlign: alignPropType,
  prefixMarginRight: unitPropType,
  prefixWidth: unitPropType,
  prefixColor: colorPropType,
  suffix: PropTypes.node,
  suffixAlign: alignPropType,
  suffixMarginLeft: unitPropType,
  suffixWidth: unitPropType,
  suffixColor: colorPropType,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  size: 'sm',
  prefixAlign: 'center',
  prefixMarginRight: 16,
  suffixAlign: 'center',
  suffixMarginLeft: 16,
}

function Text (props) {
  const {
    prefix,
    prefixAlign,
    prefixMarginRight,
    prefixWidth,
    prefixColor,
    suffix,
    suffixAlign,
    suffixMarginLeft,
    suffixWidth,
    suffixColor,
    className,
    children,
    ...restProps
  } = props

  const hasPrefix = typeof prefix !== 'undefined' && prefix !== null && prefix !== false
  const hasSuffix = typeof suffix !== 'undefined' && suffix !== null && suffix !== false

  return (
    <Typography element='span' className={cx('typography-text', className)} {...restProps}>
      {hasPrefix && (
        <span
          className={cx('typography-text__affix', 'typography-text__affix--prefix')}
          style={{ alignSelf: prefixAlign, marginRight: prefixMarginRight, width: prefixWidth }}
          data-color={prefixColor}
        >
          {hasPrefix && prefix}
        </span>
      )}
      {hasPrefix || hasSuffix ? <span className={cx('typography-text__content')}>{children}</span> : children}
      {hasSuffix && (
        <span
          className={cx('typography-text__affix', 'typography-text__affix--suffix')}
          style={{ alignSelf: suffixAlign, marginLeft: suffixMarginLeft, width: suffixWidth }}
          data-color={suffixColor}
        >
          {suffix}
        </span>
      )}
    </Typography>
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

export default Text
