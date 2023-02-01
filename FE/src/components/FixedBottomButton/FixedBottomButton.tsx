import React from 'react';

import './FixedBottomButton.styles.scss';

interface IFixedBottomButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onClick: () => void;
}

function FixedBottomButton({
  text,
  onClick,
  ...rest
}: IFixedBottomButtonProps) {
  return (
    <div onClick={onClick} {...rest} className="fixed-bottom-button">
      {text}
    </div>
  );
}

export default FixedBottomButton;
