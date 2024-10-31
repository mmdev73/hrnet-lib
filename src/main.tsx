import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Select } from './index.js';
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App: React.FC = () => {
  // For Select component use
  const [select, setSelect] = React.useState<string>("");
  const optionsSelect = ['Option 1', 'Option 2', 'Option 3'];


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

    </div>
  </>);
};

root.render(<App />);
