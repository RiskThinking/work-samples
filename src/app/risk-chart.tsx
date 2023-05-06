import { getAssets, getBusiness, getAChart, getBChart } from "./api/hello/graphData";
import React, {Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
/*
* this class isn't complete but has enough functionality to show the template for 
* what the charge will have
* issue: updating the chart functionality isn't implemented fully or properly updated
* need to refresh each time by saving the code after pressing an option
* in the control panel in order for the chart to update
* data is parsed and retrieved using the control method but no update function which updates
* the chart
*/


var parsedDataRisk:any[] = [];
var parsedDataYears:any[] = [];
// method to parse chart data
function parseData(){
    var years:number[] = [];
    
    chartdata.forEach(ele => {
        if(years.indexOf(ele[1]) === -1){
            years.push(ele[1]); 
        }
    });
    years.sort();
    var averageRisk:any[] = new Array(years.length).fill(0);
    var riskQty:any[] = new Array(years.length).fill(0);
    
    chartdata.forEach(ele => {
        averageRisk[years.indexOf(ele[1])] += ele[0];
        
        riskQty[years.indexOf(ele[1])] += 1;
    });
    for(let i = 0; i < averageRisk.length; ++i){
        averageRisk[i] = averageRisk[i]/riskQty[i];
    }
    parsedDataRisk = averageRisk;
    parsedDataYears = years;
    setOptions();
}

var options = {}; 
// updates options variable which controls how the chart is displayed
function setOptions (){
    options = {
        title: {
            text: 'Average Risk Rating for ' + chartTypeSelected
        },
        xAxis: {
            type: 'Years',
            min: 0,
            categories: parsedDataYears
        },
        yAxis: {
            type: 'Risk'
        },
        legend: {
            enabled: false
        },
        series: [
            {
                name: 'Average Risk',
                data: parsedDataRisk, parsedDataYears,
            }
        ]

    };
    
}

var chartdata:any[] = [];
function setChartData(data:any[]){
    chartdata = data;
    parseData();
}
// sets chart data based on asset name
const LoadAChartData = async () =>{
    try{
        const res:any = await getAChart(chartTypeSelected);
        setChartData(res);
    }catch(err){
        console.log(err);
    }
}
//  sets chart data based on business name
const LoadBChartData = async () =>{
    try{
        const res:any = await getBChart(chartTypeSelected);
        setChartData(res);
    }catch(err){
        console.log(err);
    }
}

var chartTypeSelected = '';

function setATypeSelected(type:any){
    chartTypeSelected = type;
    LoadAChartData();
}
function setBTypeSelected(type:any){
    chartTypeSelected = type;
    LoadBChartData();
}
chartTypeSelected = 'Energy';
LoadBChartData();
var assetNames:any[] = [];
// sets and appends business and asset names when called
//and updated the control div
function setAssetNames(data:any){
    assetNames = data;
    const doc = document.getElementById('selectable-data') as HTMLElement;
    doc.innerHTML='';
    assetNames.forEach(aName => {
    
        if(document.getElementById(`${aName[0]}`) === null){
            
            const btn = document.createElement('button');
            btn.id = aName[0];
            btn.className = 'chartButtons';
            btn.innerText = aName[0] + '';
            btn.onclick = (e) => setATypeSelected(aName[0]);
            doc.appendChild(btn);
        }
    });
    
}

const LoadAssetNames = async () => {
    try{
        const res = await getAssets();
        setAssetNames(res);
    }catch(err){
        console.log(err);
    }
}

var businessNames:any[] = [];

function setBusinessNames(data:any){
    businessNames = data;
    const doc = document.getElementById('selectable-data') as HTMLElement;
    doc.innerHTML='';
    businessNames.forEach(bName => {
    
        if(document.getElementById(`${bName[0]}`) === null){
            
            const btn = document.createElement('button');
            btn.id = bName[0];
            btn.className = 'chartButtons';
            btn.innerText = bName[0] + '';
            btn.onclick = (e) => setBTypeSelected(bName[0]);
            doc.appendChild(btn);
        }
    });
    
}

const LoadBusinessNames = async () => {
    try{
        const res = await getBusiness();
        setBusinessNames(res);
    }catch(err){
        console.log(err);
    }
}
// the main HTML injection function which initially injects the chart into the website
export function RiskChart(){
    
    return (
        <div className="chart-container">
            <div id='replacechart' className="chartbox">
                <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
            </div>
            <div className="chart-controller">
                 <div className="controllerHeading">
                    <button onClick={(e) => LoadAssetNames()} className="chart-control-btn">
                       Asset
                    </button>
                    <button onClick={(e) => LoadBusinessNames()} className="chart-control-btn">
                        Business
                    </button>
                 </div>
                 <div id='selectable-data'>
                    
                 </div>
            </div>
        </div>
    )
}