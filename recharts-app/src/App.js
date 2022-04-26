import React from "react";
import "./App.css";
import {
    ComposedChart,
    Line,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    LineChart,
} from "recharts";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';

const Container=styled.div`
  background-size: cover;
  height: 100%;
  width: 100%;

  .content {
    margin: auto;
    margin-top: 20px;
    width: 70%;
    height: auto;
    background-color: #fffe;
    padding: 20px;
    border-radius: 8px;
  }

  .title {
    padding-top: 1rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 3em;
    letter-spacing: 0.15rem;
    color: #fff;
    opacity: .9;
    cursor: default;
  }

  label {
    color: #333;
  }

  .result-container {
    color: black;
    text-align: center;
    font-weight: 600;
    font-size: 4em;
    letter-spacing: 0.15rem;
    padding: 20px 0 0;
  }

  #result {
    color: #000;
  }
`;

const App=() => {
    const data=[
        {"FIRE_YEAR": 1992, "Total_Fires": 67961, "Burn_Size": 2199922.531},
        {"FIRE_YEAR": 1993, "Total_Fires": 61975, "Burn_Size": 2191587.003},
        {"FIRE_YEAR": 1994, "Total_Fires": 75932, "Burn_Size": 4115582.349},
        {"FIRE_YEAR": 1995, "Total_Fires": 71440, "Burn_Size": 2049553.158},
        {"FIRE_YEAR": 1996, "Total_Fires": 75561, "Burn_Size": 6004833.259},
        {"FIRE_YEAR": 1997, "Total_Fires": 61442, "Burn_Size": 3231569.01},
        {"FIRE_YEAR": 1998, "Total_Fires": 68356, "Burn_Size": 2015942.3},
        {"FIRE_YEAR": 1999, "Total_Fires": 89350, "Burn_Size": 6136947.4153},
        {"FIRE_YEAR": 2000, "Total_Fires": 96397, "Burn_Size": 7777188.664},
        {"FIRE_YEAR": 2001, "Total_Fires": 87001, "Burn_Size": 3836399.064},
        {"FIRE_YEAR": 2002, "Total_Fires": 76128, "Burn_Size": 6824144.3978},
        {"FIRE_YEAR": 2003, "Total_Fires": 68275, "Burn_Size": 4511189.3058},
        {"FIRE_YEAR": 2004, "Total_Fires": 69370, "Burn_Size": 8248571.1741},
        {"FIRE_YEAR": 2005, "Total_Fires": 92921, "Burn_Size": 9710848.909},
        {"FIRE_YEAR": 2006, "Total_Fires": 117943, "Burn_Size": 10082825.0016},
        {"FIRE_YEAR": 2007, "Total_Fires": 98837, "Burn_Size": 9281711.3682},
        {"FIRE_YEAR": 2008, "Total_Fires": 88306, "Burn_Size": 5427427.0868},
        {"FIRE_YEAR": 2009, "Total_Fires": 81492, "Burn_Size": 6094979.6867},
        {"FIRE_YEAR": 2010, "Total_Fires": 85579, "Burn_Size": 3526450.8417},
        {"FIRE_YEAR": 2011, "Total_Fires": 98904, "Burn_Size": 9685308.9625},
        {"FIRE_YEAR": 2012, "Total_Fires": 74258, "Burn_Size": 9448554.762},
        {"FIRE_YEAR": 2013, "Total_Fires": 66434, "Burn_Size": 4494424.4749},
        {"FIRE_YEAR": 2014, "Total_Fires": 70480, "Burn_Size": 3676997.4827},
        {"FIRE_YEAR": 2015, "Total_Fires": 77275, "Burn_Size": 10226168.9828},
        {"FIRE_YEAR": 2016, "Total_Fires": 81994, "Burn_Size": 5363710.1905},
        {"FIRE_YEAR": 2017, "Total_Fires": 82279, "Burn_Size": 10245663.2161},
        {"FIRE_YEAR": 2018, "Total_Fires": 80863, "Burn_Size": 8243921.2335}
    ];

    const data_1=[
        {"FIRE_SIZE_CLASS": "0-0.25", "total": 30025.7037},
        {"FIRE_SIZE_CLASS": "0.26-9.9", "total": 38806.3704},
        {"FIRE_SIZE_CLASS": "10.0-99.9", "total": 9120.2593},
        {"FIRE_SIZE_CLASS": "100-299", "total": 1194.8519},
        {"FIRE_SIZE_CLASS": "300-999", "total": 601},
        {"FIRE_SIZE_CLASS": "1000-4999", "total": 336.9259},
        {"FIRE_SIZE_CLASS": "5000+", "total": 165}
    ];

    const data_2=[
        {"NWCG_GENERAL_CAUSE": "Natural", "mean_size": 312.3254},
        {"NWCG_GENERAL_CAUSE": "Firearms&Explosives use", "mean_size": 270.7383},
        {"NWCG_GENERAL_CAUSE": "Power generation/transmission/distribution", "mean_size": 108.4942},
        {"NWCG_GENERAL_CAUSE": "Equipment&Vehicle use", "mean_size": 52.439},
        {"NWCG_GENERAL_CAUSE": "Recreation&ceremony", "mean_size": 44.5692},
        {"NWCG_GENERAL_CAUSE": "Arson/incendiarism", "mean_size": 33.9958},
        {"NWCG_GENERAL_CAUSE": "Fireworks", "mean_size": 29.3366},
        {"NWCG_GENERAL_CAUSE": "Railroad operations&maintenance", "mean_size": 25.0853},
        {"NWCG_GENERAL_CAUSE": "Smoking", "mean_size": 15.0507},
        {"NWCG_GENERAL_CAUSE": "Debris and open burning", "mean_size": 14.8178},
        {"NWCG_GENERAL_CAUSE": "Misuse of fire by a minor", "mean_size": 7.5071}
    ];

    const markdown=`
    
### Data Set

## U.S.
- Resource: U.S. Department of Agriculture
- Data Range: 1992 ~ 2018 wildfire in the U.S.
- Attributes: 37 features including Fire_Size, Fire_Location, Fire_Period.
- Size: 2,166,753 (2 million) rows

## Global NASA
- Resource: NASA Fire Information for Resource Management
- Data Range: 2021-04-06 to 2022-04-06 Global Wildfire
- Attributes: 14 features including brightness, location, date
- Size: 1,048,576 (1 million) rows

## Global GWIS
- Resource: Global Wildfire Information System
- Data Range: 2002~2019 Global Monthly Wildfire
- Attributes: 12 features including fire_size, country, date
- Size: 779,761 rows

## Critical Attributes Fields

| Parameter | Description | Type |
| :--- | :--- | :--- |
| FIRE_NAME | Name of the incident, from the fire report (primary) or ICS-209 report (secondary) | String |
| DISCOVERY_DATE | Date on which the fire was discovered or confirmed to exist.| Datetime |
| CONT_DATE | Date on which the fire was declared contained or otherwise controlled | Datetime |
| NWCG_GENERAL_CAUSE | Description of the cause of the fire | String |
| LATITUDE | Latitude (NAD83) for point location of the fire (decimal degrees) | Float |
| LONGITUDE | Longitude (NAD83) for point location of the fire (decimal degrees) | Float |
| tmin | The minimum air temperature in ^(@)C | Float |
| tmax | The maximum air temperature in ^(@)C | Float |
| tsun | The daily sunshine total in minutes (m) | Integer |
| prcp | The daily precipitation total in mm | Float |
| pres | The average sea-level air pressure in hPa | Float |
| wspd | The average wind speed in km/h | Float |

### Data Model

| Model | Train Accuracy % | Test Accuracy % |
| :--- | :---: | :---: |
| KNN (Balanced) | 47.0 | 41.4 |
| Decision Tree (Balanced) | 76.4 | 62.0 |
| RandomForest (Balanced) | 94.4 | 76.1 |
| Deep Learning | 54.1 | 52.0 |
| XGboost (Balanced) | 99.0 | 80.5 |
| Naive Bayes | 45.0 | 52.3 |

    `;

    return (
        <Container className="PredictionDialog">
            <div>
                <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                <h1>Total Fires per Year</h1>
                <div className="App">
                    <ComposedChart
                        width={900}
                        height={500}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5"/>
                        <XAxis dataKey="FIRE_YEAR" scale="band"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Total_Fires" barSize={20} fill="darkred"/>
                        <Line type="monotone" dataKey="Total_Fires" stroke="royalblue"/>
                    </ComposedChart>
                </div>


                <h1>Total Acres Burned per Year</h1>
                <div className="App">
                    <LineChart
                        width={700}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="FIRE_YEAR"/>
                        <YAxis yAxisId="left"/>
                        <YAxis yAxisId="right" orientation="right"/>
                        <Tooltip/>
                        <Legend/>
                        <Line yAxisId="left" type="monotone" dataKey="Burn_Size" stroke="darkred" activeDot={{r: 8}}/>
                    </LineChart>
                </div>

                <h1>Wildfire by Size Class</h1>
                <div className="App">
                    <BarChart
                        width={700}
                        height={300}
                        data={data_1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="FIRE_SIZE_CLASS"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="total" fill="darkred"/>
                    </BarChart>
                </div>

                <h1>Wildfires by General Cause</h1>
                <div className="App">
                    <ComposedChart
                        layout="vertical"
                        width={500}
                        height={600}
                        data={data_2}
                    >
                        <CartesianGrid stroke="#f5f5f5"/>
                        <XAxis type="number"/>
                        <YAxis dataKey="NWCG_GENERAL_CAUSE" type="category" tick={{fontSize: 12}}/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="mean_size" barSize={20} fill="darkred"/>
                    </ComposedChart>
                </div>

            </div>
        </Container>
    );
};

export default App;
