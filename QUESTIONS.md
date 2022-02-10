# Questions

### Q. What is the difference between Component and PureComponent? give an example where it might break my app.

A. Pure components includes a performance optimization and they are just like regular components with a `shouldComponentUpdate` that shallow compares `state` and `props`. This means, every time a prop or state field changes, the component will be re-render.

It may have an undesired behavior if there's a prop or state field that isn't actually changing but for some reason the equity comparison fails. For example:

```typescript
function ComponentA() {
	const [count, setCount] = React.useState(0);
	return <MyPureComponentB onChange={() => {
		// ...
	}}>
}
```

in the previous example, every time `ComponentA` is re-rendered, the `onChange` function is re-created, and even though it's the same function, the `MyPureComponentB` `shouldComponentUpdate` check will fail.

### Q. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

A. `ShouldComponentUpdate` doesn't actually prevent the component from being re-rendered if the value of the context being consumed changes. Instead, you can optimize it by wrapping the component with the expensive render with `<MyContext.Consumer>` and receiving the context value as a prop:

```typescript
<MyContext.Consumer>
  {value => <ComponentWithMemo value={value} />}
</MyContext.Consumer>
```

### Q. Describe 3 ways to pass information from a component to its PARENT

1. The state is stored in the parent and a callback to update this state is passed as a prop to the child. The child calls this function to update the parent state.

2. The sate is stored in the parent and the callback to update the value is passed down with the React Context API.

3. The state is stored in a state container like Redux. The parent reads the state from the state container, the child dispatches actions to update the value.

### Q. Give 2 ways to prevent components from re-rendering

1. When you pass down a callbacks to update the parent's state, the React team recommends that you use `useReducer` in the parent. Instead of passing a callback function, you pass the `dispatch` which is stable across re-renders.

2. React has a performance optimization for JSX that is constant, for example:

```typescript
function ComponentA() {
	const [updatedVeryOften, ...] = React.useState(...);
	return (
		<ChildA>
			{/* will re-render when the parent does */}
			<ComponentWithExpensiveRender />
		</ChildA>
	);
}

// this component never changes and won't re-render if the parent does
const constantJSX = <ComponentWithExpensiveRender />
function ComponentB() {
	const [updatedVeryOften, ...] = React.useState(...);
	return (
		<ChildA>
			{constantJSX}	
		</ChildA>
	);
}
```

the trick can be exploited in different ways.

### Q. What is a fragment and why do we need it? Give an example where it might break my app.

A. In React, when you return a React Element from a function, you can only return a single element, e.g. when you return an Element from the render function:

```typescript
function RenderA() {
	// Whoops, doesn't work 💥
	return (
		<Label />
		<Input />
	)
}

function RenderA() {
	// this works ✅
	return (
		<>
			<Label />
			<Input />
		</>
	)
}
```

React fragments are invisible elements that allows to wrap multiple elements.

It can break your app, for example, when the expected element is required to have a ref (e.g. `React.cloneElement` is used to extract the ref) since fragments doesn't have one.

### Q. Give 3 examples of the HOC pattern

Hight Order Components is a pattern to share logic between components. Three examples from popular libraries are: Redux `connect`, React Router `withRouter`, or styled-components `styled`.

### Q. what's the difference in handling exceptions in promises, callbacks and async...await.

- Exceptions in promises can be handled a `.then` function.
- Exceptions in callbacks are conventionally handled by calling the callback with a not null first argument (the callback being something like `(err, data) => {...}`).
- async...await can handle exceptions with a try...catch structure.

### Q. How many arguments does setState take and why is it async.
A. setState receives two arguments, the fist one is the new value or the callback function to get the new value, the second one is a callback that is called when the new state was updated. It is async because React doesn't update the state immediately, so that all the state changes for the current event handler can be batched.

### Q. List the steps needed to migrate a Class to Function Component

1. The state that was stored in a object now should be store in individual useState variables. You should pay attention to the API differences, e.g. the useState setState function doesn't merge the previous state with the new one.
2. Side-effects that used to live in componentDidMount and componentDidUpdate should be migrated to useEffect. The logic now needs be written in a more declarative fashion. Some of the difference are that componentDidMount/componentDidUpdate runs synchronously after render while useEffect runs asynchronously.
3. ShouldComponentUpdate can be replaced with React.memo for props but doesn't currently doesn't exist a mechanism for state.
4. Context can be consumed with useContext.
5. Refs should use useRef.

### Q. List a few ways styles can be used with components

A. Styles can only be applied using the component's style object or using CSS selectors in the stylesheet. There are multiple techniques popular techniques to prevent potential issues like rules collisions:

1. CSS Modules
2. CSS-in-JS tools like emotion or style-components
3. CSS frameworks like bootstrap or tailwind

### Q. How to render an HTML string coming from the server

A. The server will render the root component using `ReactDOMServer.renderToString`, the client will "hydrate" the HTML coming from the server with `ReactDOM.hydrate`.
