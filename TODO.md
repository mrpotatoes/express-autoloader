### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [example/index.ts](example/index.ts#L42) | 42 | Now requires the dependencies to be set correctly.
| [example/index.ts](example/index.ts#L46) | 46 | Wrap this in an Either() so the code is cleaner and the error handling is simpler.
| [lib/index.ts](lib/index.ts#L2) | 2 | Convert to use fp-ts
| [lib/index.ts](lib/index.ts#L3) | 3 | Fix the tsconfig-paths so this doesn't break again.
| [lib/index.ts](lib/index.ts#L7) | 7 | Put into a utils file.
| [lib/index.ts](lib/index.ts#L17) | 17 | Make this a dep to be passed around.
| [lib/index.ts](lib/index.ts#L18) | 18 | This will need to become immutable eventually.
| [lib/index.ts](lib/index.ts#L22) | 22 | Make this functional.
| [tests/index.ts](tests/index.ts#L1) | 1 | Add tests yo!
| [lib/types/constants.ts](lib/types/constants.ts#L2) | 2 | Add types
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L53) | 53 | Rename this to something else.
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L57) | 57 | Perhaps rename this as well.
| [lib/types/routes.d.ts](lib/types/routes.d.ts#L63) | 63 | Is there a way to force this to be a generic and then force the consumer to define it?
| [lib/utils/files.ts](lib/utils/files.ts#L28) | 28 | Do this with a pipe() from fp-ts
| [lib/utils/routes.ts](lib/utils/routes.ts#L8) | 8 | Use correct express types
| [lib/utils/routes.ts](lib/utils/routes.ts#L9) | 9 | Apply middlewares
| [lib/utils/routes.ts](lib/utils/routes.ts#L10) | 10 | Apply versions
| [lib/utils/routes.ts](lib/utils/routes.ts#L11) | 11 | Apply prod/dev
| [lib/utils/routes.ts](lib/utils/routes.ts#L12) | 12 | Check if it starts with a slash, toss out a warning otherwise.
| [lib/utils/routes.ts](lib/utils/routes.ts#L15) | 15 | BAD, DELETE
| [lib/utils/routes.ts](lib/utils/routes.ts#L28) | 28 | Move this function to utils
| [lib/utils/routes.ts](lib/utils/routes.ts#L31) | 31 | How add middlewares.
| [tests/__mocks__/middlewares.ts](tests/__mocks__/middlewares.ts#L1) | 1 | Delete me when ready
| [tests/__mocks__/middlewares.ts](tests/__mocks__/middlewares.ts#L7) | 7 | Delete me when ready
| [tests/__mocks__/test.routes.ts](tests/__mocks__/test.routes.ts#L11) | 11 | Clean up the API as we don't need the req, res here at the function definition level.
