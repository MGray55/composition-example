# Component Composition Example

Simple demo of keeping React components functional and loosely coupled.

## Why?
The whole point of functional and re-useable UI components is that they don't need extra dependencies. They are literally just functions. You should be able to pass it some arguments (or properties in a component example), and get something back. And like any function, the results should be consistent and predictable. Instead of a number, or string, you happen to get HTML back with React components. That's it.

A temptation that developers fall into is to add extra dependencies to the components.
Specifically some sort of state management directly inside the component. Once this happens, it makes the component tightly coupled to an outside dependency. It makes the component harder to re-use, re-purpose, and even test.

## This example

There are no extra dependencies in the children components like useContext, or Jotai  or whatever. The outer container does fetching and passes data to the child components.
**This is the "composition" part.** We are composing a complex component from many smaller components. But the chcild components know nothing about the outside container or it's siblings. In fact, the child components can be complex components themselves. But since each one can work on it's own, as long as it receives a **loading status,  data, or an error**, it can do it's work.

You could keep following this pattern so that every single component just has a loading state, error, and data property that covers just about everything they need. If they need to send some events like user clicks, we just add a click property or similar.

## Variation
For a different flavor, the third component in here is using a custom hook. That does make the component dependent on the hook, but the component doesn't care how it works. It just knows it gets the loading state, error, and data property just like the others.

This style is probably very familair to anyone using GraphQL, or even Jotai and Redux.
In this example, you can see how wrapping the details of how a hook works inside a custom hook makes it more flexible. The component doesn't care that the fetch is done with a Rest call, or Apollo client, or the data is static. It just expects that it gets a data object, or at least a reason why the data isn't there (so it can display user feedback like "Error" or "No Results").

## Implication
With either style of data fetching, we can move them around or re-use them. We can test them without all sorts of mocks or assuming the users have a specific state management installed. And even someone outside of this project could use them.

## Notes
I have a placeholder for the URL (didn't want to use any Dimensional info in the repo).
But to run the app,  update src/constants/index.ts to a real URL. Obviously the demo expects a json payload.
```
const API_URL = '<YOUR_URL_HERE>';
```
## Run the app
Install node_modules from the root of the app
```
$ npm i
```
Start the local Vite server
```
$ npm run dev
```