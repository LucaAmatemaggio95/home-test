import React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Toolbar,
  ColumnChooser,
} from '@syncfusion/ej2-react-grids';
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';

type Props = {
  data: object[];
  filterGender: () => void;
};

const DataGrid: React.FC = (props: Props) => {
  const { data, filterGender } = props;

  // set some standard options - we could use useState if this needs to change
  const pages = { pageSize: 5 };
  const toolbarOptions = [
    'ColumnChooser',
    { text: 'Reset', prefixIcon: 'e-filter', id: 'resetGender' },
    { text: 'Male', prefixIcon: 'e-filter', id: 'filterMale' },
    { text: 'Female', prefixIcon: 'e-filter', id: 'filterFemale' },
  ];

  // format NULL values
  const formatField = (field: string, data: object) => {
    if (data[field] === null) {
      return '--';
    }
    return data[field];
  };

  // replace gender with a Material Icon
  const genderTemplate = (props: any) => {
    const { Gender } = props;

    return (
      <span className="material-symbols-rounded">
        {Gender === 'Male' ? 'man' : 'woman'}
      </span>
    );
  };

  // display Emails inside a list
  const emailsTemplate = (props) => {
    const data = props.Emails.map((email: string, index: number) => {
      return { text: email, id: index };
    });

    // if there are no emails related to this row
    if (data.length === 0) {
      return '';
    }

    // the <div> here is necessary to wrap correctly the element when it needs to be removed
    return (
      <div>
        <ListBoxComponent dataSource={data} />
      </div>
    );
  };

  return (
    <GridComponent
      dataSource={data}
      allowPaging={true}
      pageSettings={pages}
      toolbar={toolbarOptions}
      showColumnChooser={true}
      toolbarClick={filterGender}
    >
      <ColumnsDirective>
        <ColumnDirective field="FirstName" width="100" textAlign="Right" />
        <ColumnDirective field="LastName" width="100" />
        <ColumnDirective
          field="Gender"
          width="100"
          textAlign="Right"
          template={genderTemplate}
        />
        <ColumnDirective
          field="Age"
          width="100"
          textAlign="Right"
          valueAccessor={formatField}
        />
        <ColumnDirective
          field="Emails"
          width="100"
          textAlign="Right"
          template={emailsTemplate}
        />
      </ColumnsDirective>
      <Inject services={[Toolbar, ColumnChooser, Page]} />
    </GridComponent>
  );
};

export default DataGrid;
