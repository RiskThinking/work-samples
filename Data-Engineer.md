# Work Sample for Data Engineer

Solve the following problems using a DAG (Directed Acyclic Graph) oriented tool, such as Pachyderm, Airflow, Dagster, etc.

## Problem 1: Climate Data Processing

**Objective**: Ingest and transform raw climate data in batch mode.

### Tasks:
1. Implement data tasks to ingest raw climate data in batch mode from multiple sources and transform it into a common format.
2. Output resulting dataset into a structured format (e.g., Parquet).
3. Optimize performance and throughput by leveraging means such as parallelization, multiprocessing, multithreading, etc.

## Problem 2: Finance Data Processing

**Objective**: Ingest and transform real-time financial data streams.

### Tasks:
1. Implement data tasks to ingest real-time financial data streams and transform into a format that can be joined against the Climate Data from Problem 1 on geo and time signals.
2. Output resulting dataset into a structure format (e.g., Parquet).
3. Optimize performance and throughput by leveraging means such as parallelization, multiprocessing, multithreading, etc.

## Problem 3: Data Integration

**Objective**: Integrate climate and finance data using geo and time signals, perform aggregations.

### Tasks:
1. Integrate climate and finance data using geo and time signals and perform aggregations.
2. Retain the resulting aggregated dataset into a relational database (such as SQLite).

## Problem 4: API Service

**Objective**: Build an API service to serve data queries.

### Tasks:
1. Implement one or multiple API endpoints for real-time queries into the relational database from Problem 3.
2. Implement one or multiple API endpoints for queries into the stage-retained dataset from Problem 1 and 2 (e.g., Parquet).
3. (Bonus) Implement reasonable tests for data processing tasks from Problems 1-3.

## Notes

_WIP_

## Submission

_WIP_
