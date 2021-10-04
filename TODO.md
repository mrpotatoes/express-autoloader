### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [example/index.ts](example/index.ts#L41) | 41 | Now requires the dependencies to be set correctly.
| [example/index.ts](example/index.ts#L46) | 46 | Wrap this in an Either() so the code is cleaner and the error handling is simpler.
| [lib/index.ts](lib/index.ts#L2) | 2 | Convert to use fp-ts
| [lib/index.ts](lib/index.ts#L3) | 3 | Re-org this directory
| [lib/index.ts](lib/index.ts#L8) | 8 | Fix the tsconfig-paths so this doesn't break again.
| [lib/index.ts](lib/index.ts#L13) | 13 | Make this a dep to be passed around.
| [lib/index.ts](lib/index.ts#L14) | 14 | This will need to become immutable eventually.
| [lib/index.ts](lib/index.ts#L29) | 29 | Put into a utils file.
| [lib/index.ts](lib/index.ts#L39) | 39 | Use correct express types
| [lib/index.ts](lib/index.ts#L40) | 40 | Apply middlewares
| [lib/index.ts](lib/index.ts#L41) | 41 | Apply versions
| [lib/index.ts](lib/index.ts#L42) | 42 | Apply prod/dev
| [lib/index.ts](lib/index.ts#L43) | 43 | Check if it starts with a slash, toss out a warning otherwise.
| [lib/index.ts](lib/index.ts#L55) | 55 | Move this function to utils
| [lib/index.ts](lib/index.ts#L58) | 58 | How add middlewares.
| [lib/index.ts](lib/index.ts#L78) | 78 | Do this with a pipe() from fp-ts
| [lib/index.ts](lib/index.ts#L100) | 100 | Make this functional.
| [tests/index.ts](tests/index.ts#L1) | 1 | Add tests yo!
| [lib/types/constants.ts](lib/types/constants.ts#L2) | 2 | Add types
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L53) | 53 | Rename this to something else.
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L57) | 57 | Perhaps rename this as well.
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L63) | 63 | Is there a way to force this to be a generic and then force the consumer to define it?
| [lib/utils/routes.ts](lib/utils/routes.ts#L1) | 1 | Move all the route specific code into here.
| [tests/__mocks__/middlewares.ts](tests/__mocks__/middlewares.ts#L1) | 1 | Delete me when ready
| [tests/__mocks__/middlewares.ts](tests/__mocks__/middlewares.ts#L7) | 7 | Delete me when ready
| [tests/__mocks__/test.routes.ts](tests/__mocks__/test.routes.ts#L1) | 1 | Move `src/_routes/` to `tests/__mocks__`
| [tests/__mocks__/test.routes.ts](tests/__mocks__/test.routes.ts#L18) | 18 | Handle dependencies correctly.
| [tests/__mocks__/test.routes.ts](tests/__mocks__/test.routes.ts#L19) | 19 | Gotta make sure that this is modifiable when handing it over to the handler
