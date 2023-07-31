## bread

- Classes
- Commands - some should be part of framework, review later
- Events - a more generic version of these that run default framework actions plus user actions may be a good idea
- Interfaces - bread-relevant only
- strings - review later
- Utils
    - index.ts - barrel file
    - bible.ts - bread only
    - react.ts - bread only
- /
    - constants.ts - framework specific constants need to be moved
    - example-config.ts - bread only
    - index.ts - bread only

## framework

- Classes
    - BreadEmbed.ts - some convenience methods on MessageEmbed
- Events
- Interfaces
- strings
- Utils
    - index.ts - barrel file
    - discord.ts - contains command execution logic
    - randomNumber.ts - contains a few random number methods
    - logger.ts - contains a logger implementation
    - mentions.ts - for handling discord mentions - currently only supports user/member mentions, should be improved later
- /
    - index.ts - barrel file
    - index.d.ts - framework typings declaration
