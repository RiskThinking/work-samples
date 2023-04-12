# Work Sample for UI/UX Developers

## Problem 1: Implement a Map with Location Markers and Risk Indicators

**Objective**: Create an interactive map that displays the geographic locations from the provided dataset and highlights the relative risk levels using color-coded markers.

### Tasks:
1. Set up a Next.js boilerplate app with the following command under Node v18 environment
    ```shell
    yarn create next-app risk-viz --ts --tailwind --eslint --src-dir --import-alias "@/*" --experimental-app
    ```
    _or_
    ```shell
    npx create-next-app@latest risk-viz --ts --tailwind --eslint --src-dir --import-alias "@/*" --experimental-app
    ```
2. Integrate a mapping library (e.g., Mapbox, Leaflet, Google Maps).
3. Load and parse the sample geo and multi-factor climate risk datasets.
4. Display the locations from the dataset as markers on the map.
5. Color-code the markers based on their relative risk levels derived from the dataset.
6. Add interactivity to the map, such as zooming and panning.

## Problem 2: Create a Data Table with Sorting and Filtering Capabilities

**Objective**: Display the climate risk data in a table format, allowing users to sort and filter the dataset.

### Tasks:
1. Create a responsive data table component.
2. Load and display the sample climate risk dataset in the table.
3. Implement sorting functionality for each column in the table.
4. Add filtering options to the table, allowing users to filter the dataset based on risk factors or location.

## Problem 3: Visualize Risk Over Time with Line Graphs

**Objective**: Create a line graph to visualize the changes in risk levels over time for a given location or region.

### Tasks:
1. Set up a charting library (e.g., Chart.js, D3.js, Highcharts).
2. Load and parse the sample time-series climate risk dataset.
3. Create a line graph component that displays the risk levels over time for a selected location or region.
4. Add interactivity to the graph, such as tooltips displaying risk factors and dates.
5. Implement a user interface for selecting different locations or regions to visualize their risk levels over time.

## Problem 4: Integrate Components and Optimize Performance

**Objective**: Combine the components from the previous problems into a cohesive web app, ensuring optimal performance and user experience.

Tasks:
1. Design a user interface that integrates the map, data table, and line graph components.
2. Implement state management to handle user interactions and data flow between components (e.g., selecting a location on the map updates the line graph and data table).
3. Optimize the app's performance by implementing lazy loading for components and efficient data handling.
4. Ensure the app is responsive and accessible for a variety of devices and users.
