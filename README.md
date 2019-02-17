# unlimitedjs

![](https://stken2050.github.io/unlimitedjs/img/unlimitedjs-logo.png)

A minimal JavaScript framework for building UI with no limitations, full flexibility and zero rules - just pure functional and reactive programming to compose virtual DOM


## unlimitedjs Quick Start

### 1. Clone this repository

```
git clone https://github.com/stken2050/unlimitedjs
```

### 2. Go into the repository and Install dependencies

```
cd unlimitedjs
npm install
```

### 3-a. Run the [timeline-monad](https://github.com/stken2050/timeline-monad/) app

###### Use [esm](https://www.npmjs.com/package/esm) (installed to the project local as a dev-dependency) as the ES module loader for Node 
```
node -r esm ./timeline-monad-start/hello-timeline.js

node -r esm ./timeline-monad-start/hello-all.js
```

### 3-b. Run the [unlimitedjs](https://github.com/stken2050/unlimitedjs) webapp

###### Transpile JSX/TSX -> JS with [TypeScript](https://www.typescriptlang.org/) (installed to the project local as a dev-dependency)

```
tsc -p ./unlimitedjs-start/
```

###### Open the HTML File in Firefox locally

**`unlimitedjs/unlimitedjs-start.html`**

**`unlimitedjs/unlimitedjs-start-cdn.html`**

Firefox recommended since Chrome does not work with local ESM files for security restriction.

## Read more on [Docs & Tutorial]( https://stken2050.github.io/unlimitedjs/)

## MIT License