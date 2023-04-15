# Work Sample for UI/UX Developers

You are given a sample [Climate Risk Rating dataset](https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/edit#gid=681415175) in order to solve the following problems.

## Problem 1: Implement a Map with Location Markers and Risk Indicators

**Objective**: Create an interactive map that displays the geographic locations from the provided dataset and highlights the relative risk levels using color-coded markers.

### Tasks:
1. Set up a Next.js boilerplate app with the following command under Node v16 environment
    ```shell
    yarn create next-app risk-viz --ts --tailwind --eslint --src-dir --import-alias "@/*" --experimental-app
    ```
    _or_
    ```shell
    npx create-next-app@latest risk-viz --ts --tailwind --eslint --src-dir --import-alias "@/*" --experimental-app
    ```
2. Load and parse the sample datasets.
3. Integrate a mapping library (e.g., Mapbox, Leaflet, Google Maps).
4. Implement a control for users to select different decades.
5. Display the locations (Lat, Long) from the dataset as markers on the map of a given decade year.
6. Color-code the markers based on their Risk Rating (climate risk score) derived from the dataset.
7. Add interactivity to the map, such as zooming and panning, and display a tooltip with the Asset Name and Business Category on marker hover.

## Problem 2: Create a Data Table with Sorting and Filtering Capabilities

**Objective**: Display the climate risk data in a table format, allowing users to sort and filter the dataset.

### Tasks:
1. Create a data table component.
2. Load and display the sample dataset with a given year selection (from Problem 1) in the table.
3. Implement sorting functionality on reasonable columns.
4. Implement filter functionality on reasonable columns, especially risk factors.

## Problem 3: Visualize Risk Over Time with Line Graphs

**Objective**: Create a line graph to visualize the changes in risk levels over time for a given location, Asset or Business Category.

### Tasks:
1. Set up a charting library (e.g., Chart.js, D3.js, Highcharts).
2. Implement a line graph component that displays the Risk Rating over time (Year) for a selected location (Lat, Long), Asset, or Business Category.
3. Add interactivity to the graph, such as tooltips displaying Asset Name, Risk Rating, Risk Factors, and Year.
4. Implement controls for selecting different locations, Assets, or Business Categories to visualize their risk levels over time.
    - You may need to perform some data aggregation in order to achieve this.

## Problem 4: Integrate Components and Optimize Performance

**Objective**: Combine the components from the previous problems into a cohesive web app, ensuring optimal performance and user experience.

### Tasks:
1. Design a user interface that integrates the map, data table, and line graph components.
2. Implement state management to handle user interactions and data flow between components (e.g., selecting a location on the map updates the line graph and data table).
3. Optimize the app's performance by implementing lazy loading for components and efficient data handling, such as pagination for the data table.
4. (Bonus) Implement reasonable tests for utility functions, data flow hooks, and React components.

## Notes

- You are encouraged to use any open source libraries to assist with the given problems.
- You can use AI assistants (such as ChatGPT or GitHub Copilot), but make sure to include the full interaction/chat log along with your solution.
- Attribute tutorials, Stackoverflow Q&As, and any other references along with your solution.
- You are encouraged to ask any questions you may have during the hiring process, including but not limited to questions related to the work sample itself.
- Keep in mind that both the amount and the dimension of the data we work with are much higher in reality, so try to demonstrate that your solutions can handle beyond the sample scale.
- Try to think of yourself as the user of the web app, who may want to have certain questions answered, such as:
    - What are the top risk factors by ranking?
    - What regions are at the most risk?
    - What risk factors impact a particular category the most?
    - Any others that you can think of...
- You are more than welcome to keep your solutions public as a part of your professional portfolio.

## Submission

1. Host your solution code in a open source repository (e.g. GitHub).
2. Deploy your solutions through a suitable service (see below for recommended services, especially [Glitch](https://glitch.com/)).
3. Reply to the original work sample email with your solution source and deployment links.

Some recommended services for your deployments are:

- [Glitch](https://glitch.com/)
- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
