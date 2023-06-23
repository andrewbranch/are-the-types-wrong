# @ice__app@3.2.6.tgz

```
$ attw @ice__app@3.2.6.tgz


⚠️ A require call resolved to an ESM JavaScript file, which is an error in Node and some bundlers. CommonJS consumers will need to use a dynamic import. https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/CJSResolvesToESM.md

💀 Import failed to resolve to type declarations or JavaScript files. https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/NoResolution.md

🥴 Import found in a type declaration file failed to resolve. Either this indicates that runtime resolution errors will occur, or (more likely) the types misrepresent the contents of the JavaScript files. https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/InternalResolutionError.md


┌────────────────────┬───────────────────────────────────┬───────────────────────────────────┬───────────────────────────────────┐
│                    │ "@ice/app"                        │ "@ice/app/types"                  │ "@ice/app/analyze"                │
├────────────────────┼───────────────────────────────────┼───────────────────────────────────┼───────────────────────────────────┤
│ node10             │ 🟢                                │ 🟢                                │ 💀 Resolution failed              │
├────────────────────┼───────────────────────────────────┼───────────────────────────────────┼───────────────────────────────────┤
│ node16 (from CJS)  │ ⚠️ ESM (dynamic import only)      │ ⚠️ ESM (dynamic import only)      │ ⚠️ ESM (dynamic import only)      │
│                    │ 🥴 Internal resolution error      │ 🥴 Internal resolution error      │                                   │
├────────────────────┼───────────────────────────────────┼───────────────────────────────────┼───────────────────────────────────┤
│ node16 (from ESM)  │ 🥴 Internal resolution error      │ 🥴 Internal resolution error      │ 🟢 (ESM)                          │
├────────────────────┼───────────────────────────────────┼───────────────────────────────────┼───────────────────────────────────┤
│ bundler            │ 🟢                                │ 🟢                                │ 🟢                                │
└────────────────────┴───────────────────────────────────┴───────────────────────────────────┴───────────────────────────────────┘


```

Exit code: 1