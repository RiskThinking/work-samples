# Work Sample for Bias Correction

**Objective**: Ingest and process raw climate data

**Total points**: 100

## Task 1: Download data

**[10 points]**

In the data folder, we have provided you with historical climate data (daily maximum temperature) for a region in North America. The file is called [daily_maximum_temperature.nc](data/daily_maximum_temperature.nc). It roughly covers an area of 500 km x 500 km, centered on Lytton, BC, Canada. This data comes from ECMWF Reanalysis v5 (ERA5).

Select a global climate model from the CMIP6 experiments, and download the historical (1951-2015) and future data (2015 - 2100) for one emission scenario. We provide some potentially useful links below, but feel free to use other resources:

- https://cds.climate.copernicus.eu/cdsapp#!/search?type=dataset
- https://disc.gsfc.nasa.gov/datasets?page=1
- https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00532/html
- https://esgf-dev1.llnl.gov/search 
- https://catalog.pangeo.io/browse/master/
- https://gallery.pangeo.io/repos/pangeo-gallery/cmip6/intake_ESM_example.html

Write a brief note (200-250 words) explaining why you chose that particular dataset, and your intended methodology for performing the analysis (details below).

## Task 2: Process the data

**[50 points]**

Downscale and bias-correct the future maximum temperature for the target region. Note that this is a subset of a larger dataset and the overarching goal is to bias-correct the entire global dataset. The methodology you choose here should be scalable to work globally. 

Please note that we chose Lytton as an example for a specific reason. Are there any trade offs associated with your data, methods, and results? There is no right or wrong answer. All methodologies and datasets have their advantages and disadvantages. 

Make sure you provide sufficient details about your chosen methodology, assumptions, and thought process. Feel free to use any programming language. Submit your response in the form of a Jupyter notebook, R Markdown, or something similar. Host your solution in an open source repository (e.g. GitHub).

## Task 3: Documentation

**[20 points]**

Document the methodology and results of your project, similar to an abstract submission or a conference poster (200-250 words). Candidates are encouraged to use maps and figures.

## Task 4: Results and discussion

**[20 points]**

Respond to the following prompts. Limit each response to **100-150 words** (conciseness is appreciated).

1. What are the limitations in your selection of downscaling and bias-correction techniques?
2. What was the rationale behind your choice of climate data? What are the limitations in your selection of datasets?
3. How would you address these limitations?
4. Would you use different methods and datasets to downscale and bias-correct different variables? For example, temperature fields vs precipitation fields.
5. Given enough resources (time, compute, and storage), what techniques/methodologies would you employ to achieve a better outcome?
6. What techniques did you use, or could use, to make your process more efficient in terms of computational and storage requirements?
