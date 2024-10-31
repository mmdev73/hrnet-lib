# HRNet-lib
## A custom library for the HRNet educational project.

`HRNet-lib` is a library developed for an educational project and will no longer be maintained once the project is completed. It is written in TypeScript and is compatible with React applications built with either TypeScript or JavaScript. The provided design is specifically tailored to the project’s requirements.

## Content

This library contains four components:

* A custom select: `Select`

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


## Versions:

### 1.0.0:
* Initial release
* Add a `Select` component.


