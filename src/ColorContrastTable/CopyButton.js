import Tippy from '@tippyjs/react';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';

const CopyButton = ({ tooltip, copyText }) => {
    return (
        <Tippy
            content={tooltip}
            delay={200}
            theme='msk-tooltip'
            placement='top-start'
        >
            <button className="bx--btn bx--btn--ghost bx--btn--sm bx--btn-icon-only" type="button" onClick={() => copy(copyText)}>
                <span className="material-icons-sharp">content_copy</span>
                <span className="msk-sr-only">copy value</span>
            </button>
        </Tippy>
    );
};

CopyButton.propTypes = {
  copyText: PropTypes.string,
  tooltip: PropTypes.string,
}

export default CopyButton;

export const CopyButtonDropdown = ({hex, figma, scss}) => {
  return (
    <Tippy
    interactive
    theme='msk-dropdown'
    placement='right-end'
    content={
      <div className='popup-dropdown'>
                <button className="bx--btn bx--btn--ghost bx--btn--sm" type="button" onClick={() => copy(figma)}>Copy Figma token</button>
                <button className="bx--btn bx--btn--ghost bx--btn--sm" type="button" onClick={() => copy(scss)}>Copy SCSS token</button>
                <button className="bx--btn bx--btn--ghost bx--btn--sm" type="button" onClick={() => copy(hex)}>Copy hex value</button>
              </div>
            }
            >
            <button className="bx--btn bx--btn--ghost bx--btn--sm bx--btn-icon-only copy-button-no-point" type="button">
                <span className="material-icons-sharp">content_copy</span>
                <span className="msk-sr-only">copy value</span>
            </button>
        </Tippy>
    );
  };

  CopyButtonDropdown.propTypes = {
    figma: PropTypes.string,
    hex: PropTypes.string,
    scss: PropTypes.string,
}
