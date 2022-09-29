import * as React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Filter,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  Toolbar,
  ColumnChooser,
} from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './style.css';

const App: React.FC = () => {
  const [showGrid, setShowGrid] = React.useState<boolean>(true);

  const [pages] = React.useState({ pageSize: 5 });

  const toolbarOptions = ['ColumnChooser'];

  const [gridData, setGridData] = React.useState({});

  const formatField = (field, data) => {
    if (data[field] === null) {
      return '--';
    }
    return data[field];
  };

  const handleClickShow = () => {
    setShowGrid(!showGrid);
  };

  const genderTemplate = (props) => {
    return (
      <span className="material-symbols-rounded">
        {props.Gender === 'Male' ? 'man' : 'woman'}
      </span>
    );
  };

  React.useEffect(() => {
    fetch(
      'https://services.odata.org/TripPinRESTierService/(S(hespbvdrrmhquk5vqlzcpbro))/People'
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGridData(data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <ButtonComponent className="buttonShow" onClick={handleClickShow}>
          {showGrid ? 'hide' : 'show'}
        </ButtonComponent>
      </div>
      {showGrid && (
        <GridComponent
          dataSource={gridData}
          allowPaging={true}
          pageSettings={pages}
          toolbar={toolbarOptions}
          showColumnChooser={true}
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
            <ColumnDirective field="Emails" width="100" textAlign="Right" />
          </ColumnsDirective>
          <Inject
            services={[Toolbar, ColumnChooser, Page, Sort, Filter, Group]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default App;
