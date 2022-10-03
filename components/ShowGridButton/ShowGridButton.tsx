import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

type Props = {
  showGrid: boolean;
  handleClick: () => void;
};

const ShowGridButton = (props: Props) => {
  const { showGrid, handleClick } = props;

  return (
    <ButtonComponent onClick={handleClick}>
      {showGrid ? 'hide' : 'show'}
    </ButtonComponent>
  );
};

export default ShowGridButton;
