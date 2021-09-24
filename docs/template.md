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
Possible import modules <%~ it.possibleModuleNames.map(moduleName => `\`${moduleName}\``).join(', ') %>  


<% for (const eslintConfig of it.eslintConfigs) { %>

## `<%~ eslintConfig.name %>`  

### configuration  

```json

<%~ JSON.stringify(eslintConfig.config, null, 2) %>

```

<% } %>
