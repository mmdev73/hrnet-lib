import React from "react";
import ReactDOM from "react-dom/client";
import { Select, Modale, DatePicker, DataTable, InputText } from './index.js';
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App: React.FC = () => {
  // For Select component use
  const [select, setSelect] = React.useState<string>("");
  const optionsSelect = ['Option 1', 'Option 2', 'Option 3'];

  // For Modale component use
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const headerTemplate = (
    <div>
      <h2>Modal Header</h2>
    </div>
  )

  // For DatePicker component use
  const [dob, setDob] = React.useState<string>('');

  // For DataTable component use
  const thList: string[] = [
    "First Name",
    "Last Name",
    "Start Date",
    "Department",
    "Date of Birth",
    "Street",
    "City",
    "State",
    "Zip Code"
  ]
  const dataProperties: string[] = [
    "firstname",
    "lastname",
    "start",
    "department",
    "dob",
    "street",
    "city",
    "state",
    "zipcode"
  ]
  const dataBody: object[] = [
    {
      firstname: "John",
      lastname: "Doe",
      start: 1656738649,
      department: "IT",
      dob: -106185600,
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipcode: "12345"
    },
    {
      firstname: "Jane",
      lastname: "Doe",
      start: 1627662224,
      department: "IT",
      dob: 884044800,
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipcode: "12345"
    },
    {
      firstname: "Jack",
      lastname: "Doe",
      start: 1714385180,
      department: "IT",
      dob: 382924800,
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipcode: "12345"
    }
  ]

  // For InputText component use
  const [inputText, setInputText] = React.useState<string>('');

  return (<>
    <div className="components-container">
      <Select
        id="test-select"
        label="Select Component"
        options={optionsSelect}
        onChange={(value: string) => setSelect(value)}
        defaultValue={select}
      />
    </div>
    <div className="components-container">
      <button
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      <Modale
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={headerTemplate}
        id="test-modal"
      >
        <p>Modale Content</p>
      </Modale>
    </div>
    <div className="components-container">
      <DatePicker
        id='test-date-picker'
        label='Date picker'
        dateOptions={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
        localDate='en-US'
        value={dob}
        onChange={(date:string) => setDob(date)}
      />
    </div>
    <div className="components-container">
      <DataTable
        id='test-data-table'
        headColumnList={thList}
        dataPropertiesList={dataProperties}
        bodyDataList={dataBody}       
      />
    </div>
    <div className="components-container">
      <InputText
        id='test-input-text'
        label='Input Text'
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
      />
    </div>
  </>);
};

root.render(<App />);
