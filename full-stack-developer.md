# Work Sample for Full Stack Developer

You are provided with a set of Parquet files containing sample datasets. Your task is to design and implement a solution that includes SQL queries for analytics, API services for data retrieval, and a bare frontend for visualizing the data. Additionally, containerize both the backend and frontend, and deploy them using a free hosting service for assessment.

The sample datasets are as follows:

#### [Climate Data](full_stack_data/climate_data.parquet)

```
┌─────────────────────┬───────────┬──────────────────────┬────────────────────┬────────────────────┬─────────────────────┬───────────────────┬────────────────────┐
│      timestamp      │ region_id │     temperature      │   precipitation    │      humidity      │     wind_speed      │ air_quality_index │   cloud_coverage   │
│      timestamp      │   int64   │        double        │       double       │       double       │       double        │       int64       │       double       │
├─────────────────────┼───────────┼──────────────────────┼────────────────────┼────────────────────┼─────────────────────┼───────────────────┼────────────────────┤
│ 2017-06-01 00:00:00 │       721 │   21.220746002946118 │ 18.422969815285715 │  95.60775929752175 │   3.805411743348274 │               144 │  52.87472958984566 │
│ 2015-11-09 00:00:00 │       181 │   10.390684252960643 │ 16.482108624042183 │  37.49490248671727 │   5.396288319034194 │                14 │  93.65361964567145 │
│ 2017-04-19 00:00:00 │         9 │   -6.211351741704401 │ 12.546731052438382 │   48.2415958403496 │   5.061370287529748 │                82 │ 43.519299226093636 │
│ 2016-01-10 00:00:00 │       954 │  -2.0196336647814297 │   10.4190996471894 │  41.63296666200223 │  1.7101187938642626 │               296 │  60.59660845058221 │
│ 2016-03-26 00:00:00 │       164 │   1.2122294285223667 │ 16.388877811454105 │  58.45046723422167 │   5.376476030712456 │               480 │  77.04674007124692 │
│ 2016-08-17 00:00:00 │       415 │   33.316568593579696 │  8.800438153331292 │  53.45533136952748 │   6.470365339132563 │               342 │  78.20813271840599 │
│ 2018-05-18 00:00:00 │       650 │    13.05657702399148 │ 14.955429517911806 │  56.01414688666234 │   6.620008640075562 │               114 │   97.3429793811171 │
│ 2016-05-14 00:00:00 │       129 │   24.048178010003873 │  5.920467548733415 │  16.26729011897646 │   7.710149999624916 │               268 │ 30.906249600835565 │
│ 2016-04-08 00:00:00 │       270 │   -6.379909255752315 │  3.363841197167341 │  4.526979639548356 │   6.799337994549461 │               222 │  4.934446030173412 │
│ 2015-04-23 00:00:00 │        24 │    31.15311081867155 │ 3.2041801772918044 │ 42.232368487023365 │  1.4503106130841437 │               225 │  29.01894245005785 │
│ 2017-11-01 00:00:00 │       254 │   -7.946319068614567 │  10.19423279195997 │   71.8374489685328 │   8.579836585302665 │               441 │  7.942859787525991 │
│ 2020-04-08 00:00:00 │       703 │     8.16628078902857 │ 12.057633322106087 │  37.43413116144577 │   8.233792726660376 │               168 │  64.33514372545271 │
│ 2015-05-20 00:00:00 │       297 │   12.792669698442257 │   8.05893587143734 │ 28.395116513734543 │    8.98080988130894 │               322 │  73.90531524208879 │
│ 2018-11-25 00:00:00 │       130 │    22.62527738137709 │  17.53963975329294 │  20.06693621882477 │   4.006186068994751 │                50 │  6.671959613471545 │
│ 2016-05-31 00:00:00 │       270 │   21.405421210391083 │ 0.1288507822254248 │  96.99467292903705 │  0.5452907492677084 │               420 │  91.46131562587843 │
│ 2020-05-01 00:00:00 │       525 │    25.53991486381748 │ 12.072387480975788 │ 28.992976248378323 │   6.339203524256229 │               131 │  81.03362915808424 │
│ 2020-12-05 00:00:00 │       383 │   -8.301969881373608 │ 10.836263774625074 │  96.98473270768916 │   5.362965648126261 │                66 │  98.17069671851719 │
│ 2017-06-06 00:00:00 │       361 │   10.236865205038985 │ 1.2534163907858065 │  60.35748179209966 │  2.0596415049429604 │               325 │  78.30323287519465 │
│ 2018-09-03 00:00:00 │       303 │    4.499010203004808 │  5.190788934167879 │  2.764728485005563 │   4.873526893760172 │               330 │ 52.105712456243246 │
│ 2015-02-19 00:00:00 │       252 │   22.077711548646143 │ 1.6197668862650194 │  99.17468666331881 │   2.921615482653561 │               149 │  59.07763143057784 │
│          ·          │        ·  │            ·         │           ·        │          ·         │           ·         │                ·  │           ·        │
│          ·          │        ·  │            ·         │           ·        │          ·         │           ·         │                ·  │           ·        │
│          ·          │        ·  │            ·         │           ·        │          ·         │           ·         │                ·  │           ·        │
│ 2015-10-19 00:00:00 │       520 │   2.7305858561086502 │   0.82150844111198 │  90.72400436299992 │  7.6594957843827824 │               335 │   61.0180752587714 │
│ 2020-12-27 00:00:00 │       817 │  -0.6854674793392999 │  15.06085792527765 │ 0.9010972373994397 │   8.983318108873215 │               461 │  82.62383641596756 │
│ 2019-07-23 00:00:00 │       594 │  -2.0207240180743584 │ 13.443354394050122 │  44.72649390969769 │  3.9960881352807522 │               123 │ 58.503720139854174 │
│ 2017-06-16 00:00:00 │       833 │   20.780365430987707 │ 1.4437347271820977 │ 40.205613301561094 │   7.746238226089176 │               489 │ 13.175014598221724 │
│ 2016-12-24 00:00:00 │       611 │   21.813897276440077 │  5.019893235163266 │  94.90459889322892 │   5.376212574822983 │               231 │   74.2374824683169 │
│ 2018-09-17 00:00:00 │        63 │    8.681457106512703 │ 0.5067564614960185 │   37.7282403391529 │   6.466878763069122 │                15 │  37.61903169317185 │
│ 2015-05-27 00:00:00 │       117 │    7.772870144503976 │  13.65719463893145 │ 22.670639219538245 │   7.211822486457406 │               329 │ 29.366447842548105 │
│ 2020-07-14 00:00:00 │       708 │   2.6100736919793004 │  9.114021029193253 │ 52.194787445619085 │   6.091916323531537 │               402 │ 30.095025894030048 │
│ 2018-05-26 00:00:00 │       275 │   -2.995389007923281 │ 0.5294570143992061 │  74.96501031370192 │   6.101622655379436 │               424 │  79.24285024336913 │
│ 2017-08-27 00:00:00 │       590 │   16.076695634405034 │  2.765158006645696 │   78.0121186681777 │   3.390449091556401 │                 2 │  84.28354548068071 │
│ 2018-11-16 00:00:00 │       757 │    17.87780190559051 │ 19.549489571093705 │  79.21933070959392 │ 0.15049564577061192 │               324 │  47.44382775225401 │
│ 2015-11-15 00:00:00 │         9 │     9.30279134737535 │  8.997345474640602 │    88.939419553901 │   4.091556219833333 │               150 │  95.91554841651148 │
│ 2017-04-09 00:00:00 │       835 │   7.1334828586629015 │  19.10714458929249 │ 63.419021306590395 │   9.999405687776795 │                63 │  63.72253621719784 │
│ 2020-07-18 00:00:00 │       937 │   34.303473362343546 │ 18.168430030669946 │   85.6495262002081 │    9.07078649916021 │               323 │  76.01108539739003 │
│ 2017-01-20 00:00:00 │       574 │    32.34662806772784 │ 11.276065200500963 │   84.1286505774386 │   5.076820542170569 │               488 │ 54.855934109808416 │
│ 2020-10-03 00:00:00 │       750 │  -2.6741215283504154 │  9.300338761861134 │  86.71405982244211 │    9.67105595918772 │               184 │  73.70072815051442 │
│ 2018-03-19 00:00:00 │       613 │ -0.22496015198277064 │   9.28611430398919 │ 28.437693868465374 │   9.372318562154238 │               399 │ 16.064977206074392 │
│ 2015-01-10 00:00:00 │       720 │    -2.60412020028377 │ 19.631036856348242 │  70.76950825264213 │   8.449740206818078 │                47 │ 3.0024970842641885 │
│ 2016-10-28 00:00:00 │       725 │   22.496361424649045 │ 18.988268018612132 │  79.58935947838475 │   9.779282253113443 │               471 │  79.87607269777932 │
│ 2017-04-24 00:00:00 │       529 │    24.27058894755462 │ 17.112047706318606 │  86.21459561854806 │   2.419331393593777 │                92 │  68.75768385070882 │
├─────────────────────┴───────────┴──────────────────────┴────────────────────┴────────────────────┴─────────────────────┴───────────────────┴────────────────────┤
│ 2000000 rows (40 shown)                                                                                                                               8 columns │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### [AQI (Air Quality Index) Reference](full_stack_data/aqi_reference.parquet)

```
┌────────────────────────────────┬─────────────────┬───────────────┐
│          aqi_category          │ aqi_range_start │ aqi_range_end │
│            varchar             │      int64      │     int64     │
├────────────────────────────────┼─────────────────┼───────────────┤
│ Good                           │               0 │            50 │
│ Moderate                       │              51 │           100 │
│ Unhealthy for Sensitive Groups │             101 │           150 │
│ Unhealthy                      │             151 │           200 │
│ Very Unhealthy                 │             201 │           300 │
│ Hazardous                      │             301 │           500 │
└────────────────────────────────┴─────────────────┴───────────────┘
```

#### [Regions](full_stack_data/regions.parquet)

```
┌───────────┬──────────────────┬─────────────────────┬─────────────────────┬────────────────────┐
│ region_id │   region_name    │      latitude       │      longitude      │     elevation      │
│   int64   │     varchar      │       double        │       double        │       double       │
├───────────┼──────────────────┼─────────────────────┼─────────────────────┼────────────────────┤
│         1 │ South Kellyberg  │  -22.58277860747475 │ -113.35214561809693 │ 1308.5284186795298 │
│         2 │ Abigailchester   │   81.12857515378491 │  15.084341056208928 │  1234.893995359999 │
│         3 │ Brownview        │   41.75890952605292 │    134.260500915507 │  4531.272902605184 │
│         4 │ West Mark        │  17.758527155466595 │   83.60095910744201 │ 1247.7309992475305 │
│         5 │ Morrisonport     │ -61.916644720361425 │  110.36201323012187 │  1359.748630643155 │
│         6 │ Elizabethville   │  -61.92098633948352 │   57.16201201585824 │ 3796.9913120898186 │
│         7 │ Stephensstad     │   -79.5449498097241 │   69.21956322642689 │    2248.6992122527 │
│         8 │ East Chadtown    │   65.91170623948832 │  125.71043456351492 │  3883.552784775906 │
│         9 │ New Curtis       │   18.20070211377758 │  -90.11951681069306 │  326.8307878219262 │
│        10 │ North James      │   37.45306400328819 │  -3.807013088469432 │ 2437.8559683669214 │
│        11 │ Travischester    │  -86.29479102675556 │ -100.36460094494319 │ 168.06800091641315 │
│        12 │ Nicholshaven     │   84.58377338915898 │  175.56048287879293 │ 313.26601727677263 │
│        13 │ Lake Debbie      │  59.839675344075914 │  159.86136228718078 │  4532.187266722055 │
│        14 │ New Kelly        │  -51.77896007791029 │ -165.80634790733788 │  696.2268555879758 │
│        15 │ West Cynthiaport │  -57.27150590272189 │   74.00706210564783 │ 2662.1034113760857 │
│        16 │ New Justinmouth  │  -56.98718822638191 │  153.08939426963968 │  2055.478013003533 │
│        17 │ Joanneshire      │  -35.23639626728321 │ -114.99287575415993 │ 1736.7166312942134 │
│        18 │ Mayochester      │   4.456157693802808 │   24.46028299894661 │  4499.166728436362 │
│        19 │ Griffinmouth     │ -12.249896644419167 │  149.57578713169505 │ 109.11698387744751 │
│        20 │ South James      │  -37.57875476435245 │ -167.77944770911242 │ 3318.9484308779456 │
│         · │     ·            │           ·         │          ·          │          ·         │
│         · │     ·            │           ·         │          ·          │          ·         │
│         · │     ·            │           ·         │          ·          │          ·         │
│       981 │ Wandahaven       │ -29.836099652947055 │ -113.00348957534017 │ 2188.3066407410174 │
│       982 │ North Hannahfort │  48.764196674247955 │  108.95159152645573 │ 1174.8670249797638 │
│       983 │ West Tamara      │  -70.81231443592108 │ -15.052720774358647 │ 3524.3550502169087 │
│       984 │ Julieburgh       │  -76.47519928755442 │  -6.131206049272123 │ 4085.6407100779256 │
│       985 │ Newmanfurt       │  41.073976116648595 │ -131.94720993026024 │ 2732.1515803892366 │
│       986 │ Frederickhaven   │ -0.8115630828842768 │ -150.98345504743511 │  4835.176376280731 │
│       987 │ Wrightchester    │  33.912431356992485 │   82.05815051055549 │  258.3436082898055 │
│       988 │ Lake Carlaland   │ -11.731079051325679 │ -1.2739851520920809 │  2523.977991522641 │
│       989 │ Port Anthony     │  -45.64763401696077 │ -22.733747058535357 │ 3592.2697366127504 │
│       990 │ West Vincentton  │   57.43841718135596 │   82.62296231486283 │  4313.202355745895 │
│       991 │ Parkerberg       │  53.894858214416274 │   95.58464363679951 │  896.2780595389503 │
│       992 │ Lake Jorge       │   35.04536475379682 │ -122.79305963903272 │  4000.017408818407 │
│       993 │ West Deborahview │  -41.01387529860671 │  39.681053811950875 │ 2763.5353785927264 │
│       994 │ North Biancaland │  16.241520036435674 │  -131.2725303800332 │  1982.768409949816 │
│       995 │ Grimesshire      │  -25.02469855079518 │   90.49503097045647 │  658.5751428954678 │
│       996 │ Melissamouth     │  -73.51522680120586 │  56.503856256170224 │  4326.478794544562 │
│       997 │ Adamsview        │    75.1164435832037 │  164.38126359004485 │  786.3660408985768 │
│       998 │ East Jimshire    │  -65.37264643458695 │ -155.17511411168837 │ 1548.9392960454961 │
│       999 │ Michaelhaven     │   81.04272368774443 │ -159.46030038554844 │ 1450.2276598121844 │
│      1000 │ Tammychester     │  -9.718960867567972 │  -78.41265311044795 │  4357.070170954272 │
├───────────┴──────────────────┴─────────────────────┴─────────────────────┴────────────────────┤
│ 1000 rows (40 shown)                                                                5 columns │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```


## Task 1: SQL Queries

Design SQL queries to perform analytics from the provided Parquet files:
- Listing of the climate data with flexible filtering.
- Statistics (min/max, mean, median, etc.) for metrics (temperature, precipitation, humidity, wind speed, etc.) over time for each region.
- Total air quality index (AQI) observations falling within each AQI category for each region.
- Implement pagination for applicable queries.
- Pay attention to query performances and scalability.
- [Bonus] Any additional analyses that would make sense and can be visualized in Task 3

You may refer to Task 3 for some context to further understand the objectives of the queries.

## Task 2: API Service

Design and implement an API service using Golang or Rust to serve the results of the SQL queries from Task 1:
- Design and implement API endpoints that would make sense for frontend implementation.
- Ensure that the API endpoints are well-documented, either inline, as an open spec (such as Swagger), or as a dedicated web page.
- Pay attention to preemptively ward off common pitfalls such as SQL injection attacks and rate-abusing/denial-of-service attacks.
- Pay attention to API performance and scalability.
- [Bonus] Perform a set of API benchmarks and implement means to improve the performance.

## Task 3: Frontend Visualization

Build a minimal frontend web app using React (or your preferred frontend library) to visualize the data by consuming the API service:
- Implement a table with filters and pagination controls that would show a list of climate data.
- Implement a chart representing selected metrics statistics over time for a selected region.
- Implement a map visualization showing the geographical distribution of regions with colour-coded air quality levels.
- [Bonus] Any additional visualizations based on Task 1 Bonus analyses

## Task 4: Deployment

- Containerize the backend and the frontend separately. Codify them in working Dockerfile(s) and/or docker-compose YAML(s)
- Deploy each through a suitable service (see below for recommendations).
    - You don't necessarily need to involve Docker in the actual deployment, depending on the service you use.
- Verify that your API service and web app are end-to-end functional, and are both publicly accessible.

## Notes

- You are encouraged to use any open source libraries to assist with the given problems.
- You can use AI assistants (such as ChatGPT or GitHub Copilot), but make sure to include the full interaction/chat log along with your solution.
- Attribute tutorials, Stack Overflow Q&As, and any other references along with your solution.
- You are encouraged to ask any questions you may have during the hiring process, including but not limited to questions related to the work sample itself.
- Keep in mind that both the amount and the dimension of the data we work with are much higher in reality, so try to demonstrate that your solutions can handle beyond the sample scale.
- You are more than welcome to keep your solutions public as a part of your professional portfolio.

## Submission

1. Host your solution code in an open source repository (e.g. GitHub).
2. Deploy your solutions through a suitable service.
3. Reply to the original work sample email with your solution source and deployment links.

Some recommended services for your deployments are:

- [Glitch](https://glitch.com/)
- [GitHub Pages](https://pages.github.com/)
- [Fly.io](https://fly.io/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
