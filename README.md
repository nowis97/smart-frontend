# SMART

A management application built with React.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Dependencies](#key-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (which includes npm by default). Alternatively, you can use Yarn.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd smart
   ```
3. Install dependencies:
   ```bash
   npm install 
   ```
   or
   ```bash
   yarn install
   ```

## Available Scripts

In the project directory, you can run the following scripts using `npm run <script-name>` or `yarn <script-name>`:

### `start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Removes the single dependency configuration and copies all configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) right into your project. If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `svgr`

Converts SVG files from the `icons/` directory into React components and saves them in `src/Icons/`.
This is useful for using SVG images as React components in the application.

## Project Structure

Here's an overview of the key directories in this project:

- **`public/`**: Contains static assets like `index.html`, `manifest.json`, and images. These files are directly served by the web server.
- **`src/`**: Contains the main source code of the application. All React components, logic, and assets processed by Webpack are located here.
    - **`src/assets/`**: Contains static assets like images, fonts, and logos that are imported and used within the `src` directory (e.g., by React components).
    - **`src/components/`**: Contains reusable React components. Subdirectories often group components by feature, route, or common functionality.
    - **`src/helpers/`**: Contains utility functions, helper scripts, and custom hooks used across the application.
    - **`src/Icons/`**: Contains React components generated from SVG icons (likely via the `svgr` script). This allows for easy use of vector graphics in the UI.
    - **`src/reducers/`**: Contains Redux reducers or similar state management logic (e.g., for `useReducer` hook or context API state management).
    - **`src/services/`**: Contains modules for interacting with external APIs or backend services. This typically includes functions for making HTTP requests (e.g., using Axios).
    - **`src/styles/`**: Contains global styles, Material-UI theme customizations, or other styling-related files.
    - **`src/validators/`**: Contains validation logic, likely for forms (e.g., using a library like Yup to define schemas for data validation).

## Key Dependencies

This project relies on several key libraries:

- **`react`**: Core library for building user interfaces.
- **`react-dom`**: Serves as the entry point to the DOM and server renderers for React.
- **`react-router-dom`**: For handling routing in the application.
- **`@material-ui/core`**: Provides a comprehensive suite of UI tools and components.
- **`axios`**: Promise-based HTTP client for making API requests.
- **`@casl/ability` & `@casl/react`**: For managing user permissions and controlling access to resources.
- **`notistack`**: For displaying notifications and snackbars.
- **`yup`**: For object schema validation, often used for forms.
- **`mui-datatables`**: A Material-UI based datatable component.
- **`date-fns` & `@date-io/date-fns`**: For date utility functions and Material-UI date picker integration.

## Contributing

Contributions are welcome! If you have suggestions or want to contribute to the development, please open an issue first to discuss your ideas.

## License

This project is private and not licensed for open distribution.
