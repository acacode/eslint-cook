# eslint-cook 

[![NPM badge](https://img.shields.io/npm/v/eslint-cook.svg)](https://www.npmjs.com/package/eslint-cook)

[comment]: <> (Do not modify this file, that's autogenerated markdown, see docs folder)

```
Usage: eslint-cook [options]

Generate eslint configuration file

Options:
  -m, --modules [names...]  module names
  -r, --rewrite             rewrite existing eslint config file (default:
                            false)
  -o, --output <string>     output path (default: "./.eslintrc")
  -v, --version             output the current version
  -h, --help                display help for command
```

## How to use

```
npx eslint-cook -m typescript react -o ./eslintrc 
```

Possible module names [typescript](https://github.com/acacode/eslint-plugin-dynamic#typescript), [ts](https://github.com/acacode/eslint-plugin-dynamic#typescript), [prettier](https://github.com/acacode/eslint-plugin-dynamic#prettier), [react](https://github.com/acacode/eslint-plugin-dynamic#react), [reactjs](https://github.com/acacode/eslint-plugin-dynamic#react), [import](https://github.com/acacode/eslint-plugin-dynamic#import), [imports](https://github.com/acacode/eslint-plugin-dynamic#import), [effector](https://github.com/acacode/eslint-plugin-dynamic#effector), [effectorjs](https://github.com/acacode/eslint-plugin-dynamic#effector), [babel](https://github.com/acacode/eslint-plugin-dynamic#babel), [babeljs](https://github.com/acacode/eslint-plugin-dynamic#babel), [a11y](https://github.com/acacode/eslint-plugin-dynamic#a11y), [next](https://github.com/acacode/eslint-plugin-dynamic#next), [nextjs](https://github.com/acacode/eslint-plugin-dynamic#next), [styled-components](https://github.com/acacode/eslint-plugin-dynamic#styled-components), [sc](https://github.com/acacode/eslint-plugin-dynamic#styled-components), [unicorn](https://github.com/acacode/eslint-plugin-dynamic#unicorn)  

## modules


### [typescript](https://github.com/typescript-eslint/typescript-eslint#readme)  

> dependencies: [@typescript-eslint/eslint-plugin@^4.28.3](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), [@typescript-eslint/parser@^4.28.3](https://www.npmjs.com/package/@typescript-eslint/parser) 

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

> dependencies: [prettier@^2.4.1](https://www.npmjs.com/package/prettier), [eslint-plugin-prettier@^4.0.0](https://www.npmjs.com/package/eslint-plugin-prettier), [eslint-config-prettier@^8.3.0](https://www.npmjs.com/package/eslint-config-prettier) 

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

> dependencies: [eslint-plugin-react@^7.25.1](https://www.npmjs.com/package/eslint-plugin-react), [eslint-plugin-react-hooks@^4.2.0](https://www.npmjs.com/package/eslint-plugin-react-hooks) 

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

> dependencies: [eslint-plugin-import@^2.24.2](https://www.npmjs.com/package/eslint-plugin-import) 

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

> dependencies: [eslint-plugin-effector@^0.2.0](https://www.npmjs.com/package/eslint-plugin-effector) 

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

> dependencies: [@babel/eslint-parser@^7.15.7](https://www.npmjs.com/package/@babel/eslint-parser) 

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

> dependencies: [eslint-plugin-jsx-a11y@^6.4.1](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) 

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

> dependencies: [eslint-config-next@^11.1.2](https://www.npmjs.com/package/eslint-config-next) 

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

> dependencies: [eslint-plugin-better-styled-components@^1.1.2](https://www.npmjs.com/package/eslint-plugin-better-styled-components) 

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

> dependencies: [eslint-plugin-unicorn@^36.0.0](https://www.npmjs.com/package/eslint-plugin-unicorn) 

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

