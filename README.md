# React TypeScript Boilerplate

## A boilerplate React repository with state management, service-based custom hooks, mock service worker handlers for testing, and TypeScript

## Motivation

This is a boilerplate repository for a React application using TypeScript.

The intention behind this is to provide an out-of-the-box structure for many patterns that are emerging in the React world. For instance, this library uses a services pattern with a [service locator pattern](https://martinfowler.com/articles/injection.html#UsingAServiceLocator) as well something akin to a [state reducer pattern](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks).

The goal is to have React code that is easily testable, mockable, interchangable, and readable. It is also something I want to continue to work on to provide and represent an ideal and consistent structure for React projects.

### Architecture Considerations/Requirements

These are the things I want in a React app (or any app) insofar as I can achieve them sensibly. This started with wanting a way to easily change out functions being called by hooks e.g. `login`. If I decided to switch managed services, I wanted it to be seamless. I could have just provided an interface in addition to my custom hooks actions, but then implementation details and configuration are still a problem, like in the case with firebase where the app needs to be initialized.

So with that said here are the needs:

1. a provider pattern in order to easily switch out implementations when necessary.
2. a way to test and mock easily.
3. a place to bootstrap some third-party functionality (e.g. firebase).
4. global state
5. a place to connect components with services that had access to global state
6. some sort of reducer + state machine pattern that made sense but was simple

with these requirements I came up with:

1. a global state using useReducer, an action pattern similar to Redux/finite state machines, and Context API
2. services with interfaces being provided by `react-service-container`. Since services are provided and dependencies are injected they can be easily tested.
3. `mock-service-worker` provides any server-side functionality I want to mock or test. Again, since services are provided and dependencies are injected they can leverage `msw` more easily.
4. custom hooks that return "actions" which can call service methods, have access to global state, can dispatch new state, and perform side effects using `useEffect`.
5. providers which can flexibly handle application logic for which service to provide based on environment, context, or arbitrary factors.
6. TypeScript to implement interfaces, extended types (from third-party libraries), and prop types.

## Structure

There are several folders to explain:

1. Components
2. Config
3. Hooks
4. Providers
5. Reducers
6. Services
7. State
8. Tests
9. Types
10. Utilities

### Components

All React components

### Config

Anything that is a constant or needs to read from environment variables

### Hooks

custom hooks that provide actions for components to use. Hooks are where you use services and also update global state/perform side effects outside of your components' activity.

### Proiders

Provdiders are a place to flexibly provide services. Typically, it will only provide a single type of service, but in some instances you may want to provide different types of the same service e.g. multiple cache locations or databases. Also if you decide to switch to a new type of service, this is where you'd easily swap out your existing service.

### Reducers

educers are the place to read actions and immutably apply new global state. There will always be a master or "root" reducer like Redux, but you can easily modularize and refactor to call functions within the root reducer.

### Services

services are primarily classes (but [can be functions or Symbols](https://github.com/traviskaufman/react-service-container)) that adhere to a certain interface.

For instance, let's say you design your `AuthServiceProvider` to provide a service with two methods - `login` and `logout` - then whatever service is provided there (for instance a `FirebaseAuthService` or `AuthZeroAuthService`) must of course implement `login` and `logout`. In other words, the `Services` folder is your implmentations of the services you wish to use, while `Providers` handle the business of ensuring they adhere to the contract.

### State

the state folder has some module (I call mine `store.tsx`) that provides initial state (so we know its structure), a place to configure your [state context](https://reactjs.org/docs/context.html)as well as hook up your master reducer to the state context.

### Tests

all unit tests and e2e tests you want to include. This also includes `mocks` folder with handlers for [msw (mock service worker)](https://mswjs.io/docs/), which provides a slick way to mock your server actions. This is particularly helpful with repos using managed services.

### Types

all of your types including service interfaces and prop types for your react components.

### Utilities

various utilities for you to use - e.g. calculations for business logic, interceptors for http, handlers for errors.

## Useage

### Auth Service

This repo uses Firebase out of the box, so for authentication, you have to configure firebase with the objects in `config.ts`. Out of the box, it uses emulators in non-production, so this business logic can be changed.

If you change this implementation, you also need to handle the hook state for [`react-firebase-hooks`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth) in `auth-actions.ts`. This is used to tie the state of the authentication service (which is asynchronous and non-transparent in the case of firebase) to the global state of the application.

In addition to this, the firebase service uses emulators for testing. You can also use mocking or a sandbox service instead. I do not recommend rolling your own authentication.

### Service Container

This repository uses [`react-service-container`](https://github.com/traviskaufman/react-service-container) to provide and bootstrap services. This acts as a top-level wrapper of the React App similar to `StateProvider` and `MuiThemeProvider`

Services need to be registered to the provider via the documentation. Simply add the service you wish to provide to the `providers` prop of the `ServiceContainer` in `App.tsx`.

## Resources

- [Global State using Hooks, useReducer, and Context in TypeScript](https://nainacodes.com/blog/global-state-using-react-hooks) - by [@nainarazz](https://github.com/nainarazz)
- [React Service Container](https://github.com/traviskaufman/react-service-container) - by [@traviskaufman](https://github.com/traviskaufman)
- [Mocking Fetch/Servers with Mock Service Worker](https://kentcdodds.com/blog/stop-mocking-fetch?ck_subscriber_id=653252534) - by [@kentcdoddds](https://github.com/kentcdodds)
- [Material UI](https://material-ui.com/)
- [useReducer as Finite State Machine](https://kyleshevlin.com/how-to-use-usereducer-as-a-finite-state-machine) - by [@kyleshevlin](https://github.com/kyleshevlin)
