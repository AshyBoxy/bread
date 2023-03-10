- Fully separate bread and bread-framework
    - Bread Client? How do I handle custom databases?
        - Would something like this be acceptable? Kinda ruins the whole TypeScript idea a little...
            ```ts
            dbs: {
                {[key: string]: LevelDB}
            }
            ```
    - Add dependencies to bread-framework
- Reimplement a webhook logger

- Refactor modules to include a file inside that describes them, rather than the top level modules.ts

- Implement PartialCustomMessage - maybe a CustomMessageBase/BaseCustomMessage which they will both extend?
- Implement interactions in bread-framework
        - keeping handling for message commands aswell

- Replace the current strings system with a better library than this mess
- Stop using namespaces for constants - the orignal reason was easier type management. Research
