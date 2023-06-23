# vue@3.3.4.tgz

## Problems

```json
[
  {
    "kind": "FalseCJS",
    "entrypoint": "./jsx-runtime",
    "resolutionKind": "node16-esm"
  },
  {
    "kind": "NoResolution",
    "entrypoint": "./jsx-dev-runtime",
    "resolutionKind": "node10"
  },
  {
    "kind": "FalseCJS",
    "entrypoint": "./jsx-dev-runtime",
    "resolutionKind": "node16-esm"
  },
  {
    "kind": "Wildcard",
    "entrypoint": "./dist/*",
    "resolutionKind": "node10"
  },
  {
    "kind": "Wildcard",
    "entrypoint": "./dist/*",
    "resolutionKind": "node16-cjs"
  },
  {
    "kind": "Wildcard",
    "entrypoint": "./dist/*",
    "resolutionKind": "node16-esm"
  },
  {
    "kind": "Wildcard",
    "entrypoint": "./dist/*",
    "resolutionKind": "bundler"
  },
  {
    "kind": "InternalResolutionError",
    "resolutionOption": "node16",
    "fileName": "/node_modules/vue/dist/vue.d.mts",
    "error": {
      "moduleSpecifier": "../jsx",
      "pos": 454,
      "end": 463,
      "resolutionMode": 99,
      "trace": [
        "======== Resolving module '../jsx' from '/node_modules/vue/dist/vue.d.mts'. ========",
        "Explicitly specified module resolution kind: 'Node16'.",
        "Resolving in ESM mode with conditions 'import', 'types', 'node'.",
        "Loading module as file / folder, candidate module location '/node_modules/vue/jsx', target file types: TypeScript, JavaScript, Declaration, JSON.",
        "Directory '/node_modules/vue/jsx' does not exist, skipping all lookups in it.",
        "======== Module name '../jsx' was not resolved. ========"
      ]
    }
  }
]
```