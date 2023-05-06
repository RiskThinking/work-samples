# Work Sample for Data Engineer

To effectively solve the following data pipeline problems, it is essential to use a DAG (Directed Acyclic Graph) oriented tool. DAG tools like Pachyderm, Airflow, Dagster, etc., can help streamline data processing and management with tracking data lineage, ensuring data integrity, and minimizing errors during processing.

To provide more context and clarity, including pipeline specs and diagrams can be helpful. These artifacts can help visualize the DAG and its components, provide information on how data flows through the pipeline, and highlight the dependencies between tasks.

## Problem 1: Raw Data Processing

**Objective**: Ingest and process raw stock market datasets.

### Tasks:
1. Download the ETF and stock datasets from the primary dataset available at https://www.kaggle.com/datasets/jacksoncrow/stock-market-dataset.
2. Setup a data structure to retain all data from ETFs and stocks with the following columns.
    ```
    Symbol: string
    Security Name: string
    Date: string (YYYY-MM-DD)
    Open: float
    High: float
    Low: float
    Close: float
    Adj Close: float
    Volume: A suitable Number type (int or float)
    ```
3. Convert the resulting dataset into a structured format (e.g. Parquet).

## Problem 2: Feature Engineering

**Objective**: Build some feature engineering on top of the dataset from Problem 1.

### Tasks:
1. Calculate the moving average of the trading volume (`Volume`) of 30 days per each stock and ETF, and retain it in a newly added column `vol_moving_avg`.
2. Similarly, calculate the rolling median and retain it in a newly added column `adj_close_rolling_med`.
3. Retain the resulting dataset into the same format as Problem 1, but in its own stage/directory distinct from the first.
4. (Bonus) Write unit tests for any relevant logic.

## Problem 3: Integrate ML Training

**Objective**: Integrate an ML predictive model training step into the data pipeline.

You can use the following simple Random Forest model as a reference:

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Assume `data` is loaded as a Pandas DataFrame
data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)

# Remove rows with NaN values
data.dropna(inplace=True)

# Select features and target
features = ['vol_moving_avg', 'adj_close_rolling_med']
target = 'Volume'

X = data[features]
y = data[target]

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a RandomForestRegressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Make predictions on test data
y_pred = model.predict(X_test)

# Calculate the Mean Absolute Error and Mean Squared Error
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
```

You may come up with your own process with any choice of model architectures, algorithms, libraries, and training configurations.

### Tasks:
1. Integrate the ML training process as a part of the data pipeline.
2. Save the resulting model to disk.
3. Persist any training metrics, such as loss and error values as log files.
4. (Bonus) If you choose your own model implementation, articulate why it's better as a part of your submission.

## Problem 4: Model Serving

**Objective**: Build an API service to serve the trained predictive model.

### Tasks:
1. Implement an API service to serve the trained predictive model.
2. An `/predict` API endpoint which takes two values, `vol_moving_avg` and `adj_close_rolling_med`, and responds with an integer value that represents the trading volume.
    ```shell
    # hypothetical HTTP GET request and response
    GET /predict?vol_moving_avg=12345&adj_close_rolling_med=25
    -> 10350
    ```
3. (Bonus) Test the API service, document your methodology, provisioned computing resources, test results, a breakdown of observable bottlenecks (e.g. model loading/inference, socket/IO, etc.), and improvement suggestions for hypothetical future iterations.

## Notes

- Correctly and optimally orchestrate the data tasks from Problem 1-3. Leverage the pipeline specs and diagrams to help with your decisions, parallelize as many tasks as possible.
- Optimize performance and throughput of each data task by leveraging means such as parallelization, multiprocessing, multithreading, etc.
- You are encouraged to use any open source libraries to assist with the given problems.
- You can use AI assistants (such as ChatGPT or GitHub Copilot), but make sure to include the full interaction/chat log along with your solution.
- Attribute tutorials, Stackoverflow Q&As, and any other references along with your solution.
- You are encouraged to ask any questions you may have during the hiring process, including but not limited to questions related to the work sample itself.
- You are more than welcome to keep your solutions public as a part of your professional portfolio.

## Submission

1. Host all your solution code (Problem 1-4) in a open source repository (e.g. GitHub).
2. In the same repository, Dockerize the entire workflow for Problems 1-3 (the data/training pipeline) with necessary dependencies and build/execution configurations.
3. In the same repository, retain a log file from pipeline execution.
4. In the same repository, retain any pipeline specs, diagrams, and any relevant documentation.
5. For Problem 4 (Model Serving), deploy the API server with the model through a suitable service (see below for recommended services, such as Glitch).
    - If you have difficulty hosting the API server (e.g. due to dependency being too large), you may include an executed Python Notebook that demonstrates successful HTTP request(s) to the API server (which can be locally run at the time) and the response(s).
    - A successful and functional deployment of the API server may be awarded slightly more in evaluation.
6. Reply to the original work sample email with your solution source and deployment links.

Some recommended services for your API server deployments are:

- [Fly.io](https://fly.io/)
- [Glitch](https://glitch.com/)
- [Hugging Face Space](https://huggingface.co/spaces/)
- [Deta](https://deta.space/)
- [render](https://render.com/)
- [Heroku](https://www.heroku.com/)
- Any other of your own choice
