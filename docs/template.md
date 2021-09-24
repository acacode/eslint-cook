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

<% for (const eslintConfig of it.eslintConfigs) { %>

### [<%~ eslintConfig.name %>](<%~ eslintConfig.docs %>)  

<% if (eslintConfig.defs.length) { %>
**definitions:**  
<%~ eslintConfig.defs.map(c => `\`${c}\``).join(', ') %>    
<% } %>
<% if (eslintConfig.conflicts.length) { %>
**conflicts:**   
<%~ eslintConfig.conflicts.map(c => `\`${c}\``).join(', ') %>  
<% } %>  

**configuration:**  

```json

<%~ JSON.stringify(eslintConfig.config, null, 2) %>

```
<% if (eslintConfig.relations.length) { %>
**relations:**  
<% for (const relation of eslintConfig.relations) { %>
- `<%~ relation.name %>`  
```json
    
<%~ JSON.stringify(relation.config, null, 2) %>
    
```  

<% } %>
<% } %>

<% } %>
