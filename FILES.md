## bread

- Classes
    - MessageEmbed.ts - Doesn't *have* to be part of framework, might be a good idea though
- Commands - some should be part of framework, review later
- Events - a more generic version of these that run default framework actions plus user actions may be a good idea
- Interfaces - bread-relevant only
- strings - review later
- Utils
    - index.ts - barrel file
    - bible.ts - bread only
    - mentions.ts - should be moved to framework
    - react.ts - bread only
- /
    - constants.ts - framework specific constants need to be moved
    - example-config.ts - bread only
    - index.ts - bread only

## framework

- Classes
- Events
- Interfaces
- strings
- Utils
    - index.ts - barrel file
    - discord.ts - contains command execution logic
    - randomNumber.ts - contains a few random number methods
    - logger.ts - contains a logger implementation
- /
    - index.ts - barrel file
    - index.d.ts - framework typings declaration
