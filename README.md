- Implement PartialCustomMessage - maybe a CustomMessageBase/BaseCustomMessage which they will both extend? -- not done
- Implement interactions in bread-framework -- very much not done, high priority
        - keeping handling for message commands aswell

- Replace the current strings system with a better library than this mess - base done -- done
    - Maybe put them in json files and have a static or singleton class to handle them? -- done
- Stop using namespaces for constants - the orignal reason was easier type management. Research -- not done

- Implement the logging system differently? -- done

- Implement custom loader? -- not done, this is referring to esm loaders, currently this still uses --experimental-loader, not good

- Dynamic command names based on language and they change properly when language sources change at runtime? -- this seems difficult
