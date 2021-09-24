# eslint-plugin-dynamic

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
Possible import modules `effector`, `effectorjs`, `prettier`, `babel`, `babeljs`, `a11y`, `next`, `nextjs`, `react`, `reactjs`, `import`, `imports`, `typescript`, `ts`  

## modules


### `effector`  

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


### `prettier`  

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


### `babel`  

**definitions:**  
`babel`, `babeljs`    
**conflicts:**   
`typescript`  
  

**configuration:**  

```json

{
  "parser": "babel-eslint",
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


### `a11y`  

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


### `next`  

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


### `react`  

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


### `import`  

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



### `typescript`  

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

