import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Select, Modale, DatePicker } from './index.js';
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

  // For Date picker component use
  const [dob, setDob] = React.useState<string>('');

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
  </>);
};

root.render(<App />);
