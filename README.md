# HRNet-lib
## A custom library for the HRNet educational project.

`HRNet-lib` is a library developed for an educational project and will no longer be maintained once the project is completed. It is written in TypeScript and is compatible with React applications built with either TypeScript or JavaScript. The provided design is specifically tailored to the project’s requirements.

## Content

This library contains four components:

* A custom select: `Select`
* A custom modale: `Modale`
* A custom date picker: `DatePicker`
* A custom data table: `DataTable`
* A custom input text: `InputText`

Each component's style can be modified by overriding the CSS classes.

## How to install

Download and import directly from NPM:
```bash
npm install hrnet-lib@latest
```

Insert import `'/node_modules/hrnet-lib/dist/index.css'` at the top of your app component.

Then, you can use EcmaScript imports to use components:
```JS
import {Select} from 'hrnet-lib'
```

## Component description

### Select

The Select component has four props:

* `(string)` id : This is the id attribute, it is required.
* `(string)` label : The text to be displayed in the label tag, it is required.
* `(array)` options : An array of the desired options for the select tag, it is required.
* `(function)` onChange : the callback function, it is required.
* `(string || null)` defaultValue : null by default.
* `(string)` labelPosition : the label position. Three possibility : left, center, right. By default is set on left.

Exemple:
```JS
// For Select component use
const [select, setSelect] = React.useState<string>("");
const optionsSelect:string[] = ['Option 1', 'Option 2', 'Option 3'];

<Select
  id="test-select"
  label="Select Component"
  options={optionsSelect}
  onChange={(value: string) => setSelect(value)}
  defaultValue={select}
/>
```

### Modale

The Modale component has six props:

* `boolean` isOpen : This is the isOpen prop, it is required.
* `function` onClose : This is the onClose prop, it is required.
* `(ReactNode)` children : The content of the dialog. It is required.
* `(ReactNode)` header : The header content of the dialog. By default is set to null.
* `(ReactNode)` footer : The footer content of the dialog. By default is set to null.
* `(string)` id : The ID of the dialog. By default is set to "hrnet-modal". It highly recommended to use a unique ID.

Exemple:
```JS
// For Modale component use
const [isOpen, setIsOpen] = React.useState<boolean>(false);
const headerTemplate = (
  <div>
    <h2>Modal Header</h2>
  </div>
)

<Modale
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  header={headerTemplate}
  id="test-modal"
>
  <p>Modale Content</p>
</Modale>
```

### DatePicker

The DatePicker component has seven props:

* `string` label : The text to be displayed in the label tag, it is required.	
* `string` id : This is the id attribute, it is required.
* `string` value : The value of the input, it is required.
* `function` onChange : the callback function, it is required.
* `(Intl.DateTimeFormatOptions)` dateOptions : The options to be passed to the `Intl.DateTimeFormat` constructor. By default is set to `{ year: 'numeric', month: 'long', day: 'numeric' }`.
* `(string)` localDate : The date to be formatted. By default is set to 'en-US'.
* `(string)` labelPosition : the label position. Three possibility : left, center, right. By default is set on left.
* `(number)` initialDaysOffset : The number of days to offset the initial date. By default is set to 0.
Exemple:
```JS
// For Date picker component use
const [dob, setDob] = React.useState<string>('');

<DatePicker
  id='test-date-picker'
  label='Date picker'
  dateOptions={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
  value={dob}
  onChange={(date:string) => setDob(date)}
  initialDaysOffset={-365} // 1 year ago
/>
```

### DataTable

The DataTable component has eight props:

* `string` id : This is the id attribute, it is required.
* `string[]` headColumnList : List of column headers for the table, it is required.
* `string[]` dataPropertiesList : List of property names to be displayed in each column, it is required.
* `Record<string, any>[]` bodyDataList : Array of data records to be displayed in the table body, it is required.
* `[boolean, boolean, number]` options : An array where the first element enables/disables search, the second enables/disables sorting, and the third sets the default number of items per page. Defaults to [true, true, 5].
* `string[]` isDateData : List of property names that are dates. Defaults to ['dob', 'start'].
* `(Intl.DateTimeFormatOptions)` dateOptions : Options for formatting date fields. Defaults to { year: 'numeric', month: 'long', day: '2-digit' }.
* `(string)` localDate : The date to be formatted. By default is set to 'en-US'.

Exemple:
```JS
// For Data Table component use
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

<DataTable
  id='test-data-table'
  headColumnList={thList}
  dataPropertiesList={dataProperties}
  bodyDataList={dataBody}       
/>
```

### InputText

The InputText component has seven props:

* `string` id : This is the id attribute, it should be replace by a unique value.
* `string` value : The value of the input, it is required. By default is set to an empty string.
* `function` onChange : the callback function, it is required.
* `(string)` labelPosition : the label position. Three possibility : left, center, right. By default is set on left.
* `(string)` label : The text to be displayed in the label tag, it is required.
* `(string)` type : The type of the input. By default is set to 'text'.
* `(RegExp)` regex : The regular expression to check the input value against. By default is set to null.

Exemple:
```JS
// For InputText component use
const [inputText, setInputText] = React.useState<string>('');

<InputText
  id='test-input-text'
  label='Input Text'
  value={inputText}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
/>
```

## Versions:

### 1.0.0:
* Initial release
* Add a `Select` component.

### 1.0.1:
* Add a `Modale` component.

### 1.0.2:
* Add a `DatePicker` component.

### 1.0.3:
* Add a `DataTable` component.

### 1.0.4:
* Add a `InputText` component.

### 1.0.5:
* Update `DatePicker` and `Select` components to manage the outside click.
* Add a props `initialDaysOffset` to `DatePicker` component. Which allows to offset the initial date.

### 1.0.6:
* Update `DatePicker` to fix design issues. 

### 1.0.7:
* Update `DatePicker` to fix intempestive closing issues. 
