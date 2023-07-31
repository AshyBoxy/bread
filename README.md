- Fully separate bread and bread-framework
    - Bread Client? How do I handle custom databases?
        - Would something like this be acceptable? Kinda ruins the whole TypeScript idea a little...
            ```ts
            dbs: {
                {[key: string]: LevelDB<any>}
            }
            ```
        - Maybe something like using `BreadClient<K extends Record<[key: string], BreadDB> = {}>` and then something like `dbs: Record<keyof K, BreadDB>`? How do I get the db type through this? Maybe like `Record<string, [sometype, BreadDB<sometype>]>`??? see test.ts (gone) for a kind of implementation of this
        - Maybe using the any solution and then having the user pass in their specific type with the custom dbs on?
    - Add dependencies to bread-framework

- Refactor modules to include a file inside that describes them, rather than the top level modules.ts
    - submodules?

- Implement PartialCustomMessage - maybe a CustomMessageBase/BaseCustomMessage which they will both extend?
- Implement interactions in bread-framework
        - keeping handling for message commands aswell

- Replace the current strings system with a better library than this mess - base done
    - Maybe put them in json files and have a static or singleton class to handle them?
- Stop using namespaces for constants - the orignal reason was easier type management. Research

- Implement the logging system differently?

- Implement custom loader?
