---
title: Lerna - javascript multi-package repository manager
subTitle: Lerna - javascript multi-package repository manager
category: guide
published: false
---


```sh
$ git init react-utterances
$ cd $_
$ npx lerna init --independent
$ git add .
$ git commit -m "lerna init --independent"
```

```diff
$ git diff
diff --git a/lerna.json b/lerna.json
index a2bb50b..82f5d3e 100644
--- a/lerna.json
+++ b/lerna.json
@@ -2,5 +2,7 @@
   "packages": [
     "packages/*"
   ],
-  "version": "independent"
+  "version": "independent",
+  "npmClient": "yarn",
+  "useWorkspaces": true
 }
diff --git a/package.json b/package.json
index bef921b..135652c 100644
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "private": true,
   "devDependencies": {
     "lerna": "^3.3.1"
-  }
+  },
+  "workspaces": ["packages/*"]
 }
```

```sh
$ npx lerna bootstrap
$ npx lerna --version
```

```
# .gitignore

node_modules/
yarn-*.log
```

```
$ git add lerna.json package.json .gitignore
$ git commit -m "lerna basic setting, add .gitignore"
```


```sh
$ npx lerna create component
$ npx lerna add @babel/core packages/component
$ npx lerna add @babel/cli packages/component
$ npx lerna add @babel/preset-env packages/component
$ npx lerna add @babel/preset-react packages/component
```

.babelrc.js:
```js
module.exports = {
  presets: ['@babel/env','@babel/react']
}
```



