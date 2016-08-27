# generator-casq-node-typescript
Yeoman generator for various types of projects with Node and TypeScript

## Running (temporarily until we publish to npm)
We're assuming you already have Node.js and git installed, because let's be honest.. you should.

If you don't have yeoman installed:
```sh
npm i -g yo
```

```sh
git clone https://github.com/casualsequence/generator-casq-node-typescript && cd generator-casq-node-typescript
npm i
npm link
cd ..
yo casq-node-typescript
```

Note you will need to cd into the newly created directory if you specify an app name that is different than the name of the directory you execute the yo command from.
