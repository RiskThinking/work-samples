# This is an old version. Use [updated version](cleaned_bias_correction.md) instead. 

___

# Work Sample for Bias Correction

**Objective**: Ingest and process raw climate data

**Total points**: 100

## Task 1: Download data

[10 points] 

Download observational, reanalysis, and projected climate datasets for a 500 km by 500 km region centered on Lytton, BC Canada for the summer season in 2021. You can use a smaller region if there are memory constraints.

Select one reanalysis model, and one global climate model from one of the CMIP6 experiments. You will need the historic run (1900-2015) and the future run (2015-2100)

Options (feel free to use other resources):

- https://cds.climate.copernicus.eu/cdsapp#!/search?type=dataset
- https://disc.gsfc.nasa.gov/datasets?page=1
- ISD: https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00532/html
- https://aims2.llnl.gov/search
- https://catalog.pangeo.io/browse/master/
- https://gallery.pangeo.io/repos/pangeo-gallery/cmip6/intake_ESM_example.html 

Submit your dataset selection with a brief note on why you chose these particular datasets and your intended methodology for performing the analysis.

## Task 2: Process the data

[50 points]

Downscale and bias-correct the future maximum temperature for the target region. Note that this is a subset of the larger dataset and the overarching goal is to bias-correct the entire dataset. The methodology you choose here should be scalable to work globally. There is no right or wrong answer. All methodologies and datasets have their advantages and disadvantages.

## Task 3: Documentation

[20 points]

Document the methodology and results of your project, similar to an abstract submission or a conference poster.

## Task 4: Results and discussion

[20 points]

Respond to the following prompts. Limit each response to **200-250 words**.

1. What are the limitations in your selection of downscaling and bias-correction techniques?
2. What was the rationale behind your choice of climate data? What are the limitations in your selection of datasets?
3. How would you address these limitations?
4. Would you use different methods and datasets to downscale and bias-correct different variables? For example, temperature fields vs precipitation fields.
5. Given enough resources (compute and storage), what techniques/methodologies would you employ to achieve a better outcome.
6. What techniques did you use, or could use, to make your process more efficient in terms of computational and storage requirements?
