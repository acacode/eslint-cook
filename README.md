# eslint-plugin-dynamic  

[![NPM badge](https://img.shields.io/npm/v/eslint-plugin-dynamic.svg)](https://www.npmjs.com/package/eslint-plugin-dynamic)

## Install
```bash
yarn add -D eslint eslint-plugin-dynamic
# or using npm
npm i -D eslint eslint-plugin-dynamic
```

## How to use

Add this plugin to your `.eslintrc` file  
```json
"extends": "plugin:dynamic/typescript+react+effector+import+prettier+next",
"plugins": ["dynamic"],
```

Construction `typescript+react+effector+import+prettier+next` is dynamic.  
Possible import modules [typescript](https://github.com/acacode/eslint-plugin-dynamic#typescript), [ts](https://github.com/acacode/eslint-plugin-dynamic#typescript), [prettier](https://github.com/acacode/eslint-plugin-dynamic#prettier), [react](https://github.com/acacode/eslint-plugin-dynamic#react), [reactjs](https://github.com/acacode/eslint-plugin-dynamic#react), [import](https://github.com/acacode/eslint-plugin-dynamic#import), [imports](https://github.com/acacode/eslint-plugin-dynamic#import), [effector](https://github.com/acacode/eslint-plugin-dynamic#effector), [effectorjs](https://github.com/acacode/eslint-plugin-dynamic#effector), [babel](https://github.com/acacode/eslint-plugin-dynamic#babel), [babeljs](https://github.com/acacode/eslint-plugin-dynamic#babel), [a11y](https://github.com/acacode/eslint-plugin-dynamic#a11y), [next](https://github.com/acacode/eslint-plugin-dynamic#next), [nextjs](https://github.com/acacode/eslint-plugin-dynamic#next), [styled-components](https://github.com/acacode/eslint-plugin-dynamic#styled-components), [sc](https://github.com/acacode/eslint-plugin-dynamic#styled-components), [unicorn](https://github.com/acacode/eslint-plugin-dynamic#unicorn)  

Examples:  
```json
  "extends": "plugin:dynamic/react+typescript",  
  "plugins": ["dynamic"]
```
```json
  "extends": "plugin:dynamic/typescript+import",  
  "plugins": ["dynamic"]
```
```json
  "extends": "plugin:dynamic/import+prettier",  
  "plugins": ["dynamic"]
```

## modules


### [typescript](https://github.com/typescript-eslint/typescript-eslint#readme)  

**definitions:**  
`ts`, `typescript`    
**conflicts:**   
`babel`  
  

**configuration:**  

```json

{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "no-empty-interface": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```


### [prettier](https://github.com/prettier/eslint-plugin-prettier#readme)  

**definitions:**  
`prettier`    
  

**configuration:**  

```json

{
  "extends": [
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "printWidth": 80,
        "tabWidth": 2,
        "trailingComma": "all",
        "semi": true
      }
    ]
  }
}
```


### [react](https://github.com/yannickcr/eslint-plugin-react#readme)  

**definitions:**  
`react`, `reactjs`    
  

**configuration:**  

```json

{
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error"
  }
}
```


### [import](https://github.com/import-js/eslint-plugin-import#readme)  

**definitions:**  
`import`, `imports`    
  

**configuration:**  

```json

{
  "settings": {
    "import/resolver": {
      "alias": {
        "extensions": [
          ".js",
          ".jsx",
          ".json"
        ]
      }
    }
  },
  "extends": [
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "import"
  ],
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          [
            "external"
          ],
          [
            "builtin"
          ],
          [
            "internal"
          ],
          [
            "parent"
          ],
          [
            "sibling"
          ],
          [
            "object"
          ],
          [
            "index"
          ]
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```
**relations:**  
- `typescript`  
```json
    
{
  "settings": {
    "import/resolver": {
      "alias": {
        "extensions": [
          ".ts",
          ".tsx",
          ".js",
          ".jsx",
          ".json"
        ]
      }
    }
  },
  "extends": [
    "plugin:import/typescript"
  ],
  "plugins": [],
  "rules": {}
}    
```  



### [effector](https://github.com/effector/eslint-plugin#readme)  

**definitions:**  
`effector`, `effectorjs`    
  

**configuration:**  

```json

{
  "extends": [
    "plugin:effector/recommended"
  ],
  "plugins": [
    "effector"
  ],
  "rules": {}
}
```


### [babel](https://www.npmjs.com/package/@babel/eslint-parser)  

**definitions:**  
`babel`, `babeljs`    
**conflicts:**   
`typescript`  
  

**configuration:**  

```json

{
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "ecmaFeatures": {
      "globalReturn": false
    }
  },
  "extends": [],
  "plugins": [],
  "rules": {}
}
```


### [a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme)  

**definitions:**  
`a11y`    
  

**configuration:**  

```json

{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": [
    "jsx-a11y"
  ],
  "rules": {}
}
```


### [next](https://nextjs.org/docs/basic-features/eslint)  

**definitions:**  
`next`, `nextjs`    
  

**configuration:**  

```json

{
  "extends": [
    "next/core-web-vitals"
  ],
  "plugins": [],
  "rules": {}
}
```


### [styled-components](https://github.com/tinloof/eslint-plugin-better-styled-components#readme)  

**definitions:**  
`sc`, `styled-components`    
  

**configuration:**  

```json

{
  "extends": [],
  "plugins": [
    "better-styled-components"
  ],
  "rules": {
    "better-styled-components/sort-declarations-alphabetically": 2
  }
}
```


### [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn#readme)  

**definitions:**  
`unicorn`    
  

**configuration:**  

```json

{
  "extends": [
    "plugin:unicorn/recommended"
  ],
  "plugins": [
    "unicorn"
  ],
  "rules": {}
}
```

