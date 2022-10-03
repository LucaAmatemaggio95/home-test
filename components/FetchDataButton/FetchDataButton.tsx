import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

type Props = {
  handleClick: () => void;
};

const FetchDataButton = (props: Props) => {
  const { handleClick } = props;

  return <ButtonComponent onClick={handleClick}>Fetch data</ButtonComponent>;
};

export default FetchDataButton;
