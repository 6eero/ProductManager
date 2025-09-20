# Warehouse Management System

A modern single-page application for warehouse inventory management built with Next.js 15, React 19, and TypeScript.

## Features

- 📦 **Product Management**: View, add, edit, and remove products
- 🔍 **Search & Filter**: Filtering by category, ordering and search functionality
- 🌐 **Internationalization**: Multi-language support (English/Italian)
- ✅ **Form Validation**: Robust client-side validation with Formik and Yup
- 🧪 **E2E Testing**: Comprehensive testing with Cypress

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn/Radix UI components
- **State Management**: React Context API with useReducer
- **Form Handling**: Formik with Yup validation
- **Testing**: Cypress for E2E testing
- **Internationalization**: next-intl
- **Utilities**: Ramda, Lodash, Immer

## Project Structure

```
.
├── api/                          # API layer
│   ├── App/                      # App-level endpoints and tasks
│   └── Products/                 # Product-specific API logic
│       ├── endpoint.ts           # Mock API endpoints
│       └── tasks.ts              # Action dispatchers
├── app/                          # Next.js app directory
│   ├── [locale]/                 # Internationalized routes
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── buttons/                  # Custom button components
│   ├── formik/                   # Form-specific components
│   ├── layout/                   # Layout components
│   ├── modals/                   # Modal components
│   └── ui/                       # Shadcn/UI components
├── context/                      # React Context providers
│   ├── App.tsx                   # Application context
│   ├── Products.tsx              # Products context
│   └── Contexts.d.ts             # Context type definitions
├── cypress/                      # E2E testing
│   ├── e2e/                      # Test specifications
│   └── support/                  # Test utilities
├── hooks/                        # Custom React hooks
├── i18n/                         # Internationalization config
├── lib/                          # Utility libraries
├── messages/                     # Translation files
├── mocks/                        # Mock data
├── models/                       # TypeScript models/types
├── modules/                      # Feature modules
│   ├── app/                      # App module (actions, reducer)
│   └── products/                 # Products module
│       ├── actions.ts            # Action creators
│       ├── reducer.ts            # State reducer
│       └── components/           # Module-specific components
└── utils/                        # Utility functions
```

## State Management Architecture

The application follows a structured state management pattern using **React Context API** to manage global and feature-specific state. The **App-level context** wraps the entire component tree, while each module (e.g., Products) has its own dedicated context to encapsulate its state.

A module’s context is a structured object with fields such as:

- `data` – main module payload
- `loading` – boolean indicating ongoing operations
- `error` – error information

State should **never be mutated directly**. All updates occur through **dispatched actions** handled by the module’s reducer, ensuring unidirectional data flow and predictable state transitions.

This architecture provides:

- Centralized and consistent state management
- Isolation of module-specific state to prevent collisions
- Clear, traceable updates for easier debugging and testing

By following this pattern, the application remains **scalable, maintainable, and easy to extend** as new features are added.

### 1. Actions (`modules/products/actions.ts`)

Action creators that define the available operations:

```typescript
const PREFIX = "STOCKS";
const types = ["GET", "ADD", "REMOVE", "UPDATE"];

const actions = {
  ...getAsyncActions(`${PREFIX}`, types),
};
const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};
```

For each type defined in the types array (`GET`, `ADD`, `REMOVE`, `UPDATE`), the system automatically generates three action variants:

- `Base` – the main action that is dispatched to start the operation.
- `Success` – the action dispatched when the operation succeeds.
- `Fail` – the action dispatched if the operation fails.

Each of these actions also has a corresponding helper function (via actionsFunctions) that allows it to be dispatched easily with the appropriate payload. This way, for every operation available on stocks, it’s possible to clearly handle both the action initiation and its positive or negative outcomes, keeping the code modular and consistent.

### 2. Reducer (`modules/products/reducer.ts`)

Pure functions that handle state transitions based on dispatched actions:

```typescript
const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.GET:
        state.loading = true;
        state.error = false;
        return;
      case actions.GET_SUCCESS:
        const { data } = action.payload;
        state.data = action.payload.data;
        state.loading = false;
        return;
      case actions.GET_FAIL:
        const { error } = action.payload;
        state.error = error;
        state.loading = false;
        return;
      // ... other cases
    }
  }
);
```

### 3. Tasks (`api/Products/tasks.ts`)

Action dispatchers that handle async operations and API calls:

```typescript
export const useProductsActions = () => {
  const dispatch = useProductsDispatchContext();

  return {
    onLoad: async () => {
      try {
        dispatch(actions.get({}));
        const { data } = await APIProducts.get(); // endpoint call
        dispatch(actions.getSuccess({ data }));
      } catch (error) {
        dispatch(actions.getFail({ error }));
      }
    },
    // ... other actions
  };
};
```

### 4. Endpoints (`api/Products/endpoint.ts`)

Mock API layer that simulates backend operations:

```typescript
export const get = async () => {
  // backend api call
  // const { products } = ...
  return {
    data: { products },
    headers: {},
  };
};
```

### 5. Context (`context/Products.tsx`)

React Context provider that makes state and dispatch available throughout the component tree:

```typescript
export const ProductsContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <ProductsContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};
```

## Data Flow

1. **Component** calls action from `useProductsActions()`
2. **Task** dispatches loading action and calls endpoint
3. **Endpoint** processes request and returns mock data
4. **Task** dispatches success/failure action with response
5. **Reducer** updates state based on action type
6. **Context** provides updated state to components

## E2E Testing with Cypress

Comprehensive end-to-end testing ensures application reliability:

- **Test Location**: `cypress/e2e/products.cy.ts`
- **Coverage**: Product CRUD operations, form validation, user interactions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:6eero/ProductManager.git
   cd ProductManager/
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# E2E Testing
npm run test
```

## Testing

### Running E2E Tests

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open Cypress Test Runner**

   ```bash
   npm run test
   ```

3. **Run tests headlessly** (optional)
   ```bash
   npx cypress run
   ```

## Technical Considerations

### Design Patterns

- **Flux Architecture**: Unidirectional data flow with actions, reducers, and contexts
- **Component Composition**: Reusable UI components with clear separation of concerns
- **Custom Hooks**: Encapsulated logic for state management and form handling

### Performance Optimizations

- **Next.js Turbopack**: Fast development builds and hot reloading
- **Immer**: Immutable state updates with readable syntax
- **Code Splitting**: Automatic route-based code splitting

### Accessibility

- **Radix UI**: Accessible primitive components
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility

### Data Persistence

- **In-Memory Storage**: No backend persistence (as per requirements)
- **Mock Data**: Realistic product data for development and testing
- **State Persistence**: State maintained during application session

## Development Guidelines

### Adding New Features

1. **Create Actions**: Define action types in `modules/[feature]/actions.ts`
2. **Implement Reducer**: Handle state updates in `modules/[feature]/reducer.ts`
3. **Add Tasks**: Create API dispatchers in `api/[Feature]/tasks.ts`
4. **Mock Endpoints**: Simulate backend in `api/[Feature]/endpoint.ts`
5. **Create Context**: Provide state access in `context/[Feature].tsx`
6. **Add Tests**: Cover functionality in `cypress/e2e/[feature].cy.ts`

### Code Quality

- **TypeScript**: Strong typing for better developer experience
- **ESLint**: Consistent code formatting and best practices
- **Component Documentation**: Clear prop interfaces and usage examples

## Deployment

The application is built for deployment on Vercel.

## License

This project is private and intended for evaluation purposes.
