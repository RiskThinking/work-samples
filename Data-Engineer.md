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
    Volume: int
    ```
3. Convert the resulting dataset into a structured format (e.g. Parquet).

## Problem 2: Feature Engineering

**Objective**: Build some feature engineering on top of the dataset from Problem 1.

### Tasks:
1. Calculate the moving average of the trading volume (`Volume`) of 30 days per each stock and ETF, and retain it in a newly added column `vol_moving_avg`.
2. Similarly, calculate the rolling median and retain it in a newly added column `adj_close_rolling_med`.
3. Retain the resulting dataset into the same format as Problem 1, but in its own stage/directory distinct from the first.

## Problem 3: Integrate ML Training

**Objective**: Integrate an ML predictive model training step into the data pipeline.

```python
# WIP some simple training process
```

### Tasks:
1. Integrate the ML training process as a part of the data pipeline.
2. Retain the resulting model to the disk, name it as `model.bin`.
3. Log all training loss values to the disk as log files.

## Problem 4: Model Serving

**Objective**: Build an API service to serve the trained predictive model.

### Tasks:
1. Implement an API service to serve the trained predictive model.
2. An API endpoint should take two values, `vol_moving_avg` and `adj_close_rolling_med`, and responds with an integer value that represents the trading volume.
3. (Bonus) Implement reasonable tests for the tasks from Problems 1-2.

## Notes

- Correctly and optimally orchestrate the data tasks from Problem 1-3. Leverage the pipeline specs and diagrams to help with your decisions.
- Optimize performance and throughput of each data task by leveraging means such as parallelization, multiprocessing, multithreading, etc

## Submission

_WIP_
