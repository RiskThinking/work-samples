'use client'
import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { parse } from './api/hello/sheets';
import { getCoordinates, setYear, getYear, setMax, setMin } from './api/hello/getMarkers';
import mapboxgl from 'mapbox-gl';
var dateYear = '';
var mapboxMarkers = [];
var geoJson = [];
var orderType = 0;

function createHTML(uniqueY: any[]){
    dateYear = getYear();
    return (
    <div className="dropdown">
        <button className="dropbtn" id="button-title">
            Year: {dateYear}
        </button>
        <div className="dropdown-content">
            {getYearList(uniqueY)}
        </div>
    </div>);

} 

function onYearSelected(year){
    const doc = document.getElementById('button-title');
    doc?.replaceChildren(`Year: ${year}`);
    setYear(year);
    dateYear = getYear();
    mapboxMarkers?.forEach(marker =>{
        marker.remove();
    });
    postedMarkers = false;
    LoadCoordinates();

}
function getYearList(uniqueY: any[]){
    return (uniqueY.map((year: any) => {
        return <button key={year} id={year} onClick={e => onYearSelected(year)}>{year}</button>
    }));
}

var data;
function setData(){
    data = parse();
}


function dropDataTable(id){
    const doc = document.getElementById(`${id}`) as HTMLElement;
    doc.style.display = doc.style.display === 'block' 
    ? 'none' : 'block';

}

var columnsData = [];
function addDataList(){
    getYear();
    const doc = document.getElementById('data-list') as HTMLElement;
    doc.innerHTML = ''; //remove all html code inside of this div
    columnsData.forEach((row, ind) => {
        const listItem = document.createElement('div');
        const listBtn = document.createElement('Button');
        const listDrop = document.createElement('div');
        const listCanvas = document.createElement('div');

        listItem.className = 'listItem';
        listBtn.className = 'listBtn';
        listDrop.className = 'listDrop';
        listCanvas.className = 'listCanvas';

        listDrop.id = ind + "";
        listBtn.onclick = (e) => dropDataTable((ind+""));
        //-------------------------------//
        const infoDiv1 = document.createElement('div');
        const infoDiv2 = document.createElement('div');
        const infoDiv3 = document.createElement('div');
        const infoDiv4 = document.createElement('div');

        infoDiv1.className = 'info-divs';
        infoDiv2.className = 'info-divs';
        infoDiv3.className = 'info-divs';
        infoDiv4.className = 'info-divs';

        infoDiv1.innerText = `${row[0]}`;
        infoDiv2.innerText = `${row[3]}`;
        infoDiv3.innerText = `${row[4]}`;
        infoDiv4.innerText = `${dateYear}`;

        listBtn.appendChild(infoDiv1);
        listBtn.appendChild(infoDiv2);
        listBtn.appendChild(infoDiv3);
        listBtn.appendChild(infoDiv4);
        //-------------------------------//
        const factors:[]  = JSON.parse(row[5]);
        const keys = Object.keys(factors);
        keys.forEach(keyFactor => {
            let factordiv = document.createElement('div');
            factordiv.className = 'Factor-div';
            factordiv.innerText = `Risk Factor: ${keyFactor}: ${factors[keyFactor]}`;
            listCanvas.appendChild(factordiv);
        });
        
        listItem.appendChild(listBtn);
        listItem.appendChild(listDrop);
        listDrop.appendChild(listCanvas);
        doc.appendChild(listItem);
    });
    postedMarkers = false;

}
function setCoordinates(coords){
    geoJson = [];
    columnsData = coords;
    columnsData?.forEach((ele) => {
        geoJson.push({
            type: 'RiskCollection',
            features: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(ele[2]), parseFloat(ele[1])]
                },
                properties: {
                    AssetName: ele[0],
                    Business: ele[3],
                    risklevel: ele[4]
                }
            }
        });
    });
    addDataList();
}
const LoadCoordinates = async () => {
    try{
        const res = await getCoordinates(orderType);
        setCoordinates(res);
    }catch(err){
        console.log(err);
    }
}
let hasData:boolean = false;
let postedMarkers:boolean = false;
var htmlCode;
function addMarkers(map){
    geoJson?.forEach(function (feature) {
        const el = document.createElement('div');
        const temp = feature.features.properties.risklevel
        const risk =( 
            temp <= 0.25 ? 'marker-blue'
            : temp > 0.25 && temp <= 0.5 ? 'marker-yellow'
            : temp > 0.5 && temp <= 0.75 ? 'marker-orange'
            : 'marker-red'
        );
        el.className = `marker ${risk}`;

        const marker = new mapboxgl.Marker(el)
        .setLngLat(feature.features.geometry.coordinates)
        .setPopup( new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnMove: true})
        .setHTML(
            `<h3>${feature.features.properties.AssetName}</h3>
            <p>${feature.features.properties.Business}</p>`
        ));
        //mouse hovers over marker
        marker.getElement() .addEventListener('mouseenter', function(event: PointerEvent){
            event.stopPropagation();
            marker.togglePopup();
        });
        //mouse leaves marker
        marker.getElement().addEventListener('mouseleave', function(event: PointerEvent){
            event.stopPropagation();
            marker.togglePopup();
        })
        mapboxMarkers.push(marker.addTo(map));
        
        postedMarkers = true;
    });

}
//control bool
var initFlag: boolean = false;
export function MapBoxMap(){
    
   
    const [map, setMap] = useState<MapboxGL.Map>();
    const [lng, setLng] = useState(-79.3832);
    const [lat, setLat] = useState(43.6532);
    const [zoom, setZoom] = useState(5);
    const mapNode = useRef(null);
    setData();
    hasData = data !== undefined && data?.length > 0 ? true : false;
    if(hasData){//quick bug fix
        !initFlag ? setYear(data[0]) : '';
        initFlag = true;
        htmlCode = createHTML(data);
        LoadCoordinates();
    }
        
    if(!postedMarkers){
        //add a loading screen
        addMarkers(map);
    }
    useEffect(() => {
        const refContainer = mapNode.current;

        if(typeof window === "undefined" || refContainer == null) return;

        const mapboxMap = new MapboxGL.Map({
            container: refContainer,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            minZoom: 1,
            maxZoom: 9,
            zoom: zoom
        });
        
        mapboxMap.addControl(new MapboxGL.NavigationControl(), 'top-right');
        mapboxMap.on('move', () => {
            setLat(mapboxMap.getCenter().lat.toFixed(4));
            setLng(mapboxMap.getCenter().lng.toFixed(4));
            setZoom(mapboxMap.getZoom().toFixed(1));
            
        });

        setMap(mapboxMap);
        return () => mapboxMap.remove();
        
    }, []);
   // gMapRef = mapNode;
    if(mapNode !== null) return (<div className='map-container'><div ref={mapNode} style={{width: '65vw', height: '60vh'}}/>{htmlCode}</div>);
    
    return (<div className='loading-font-container'><p id='loading-text'>Loading Map...</p></div>);
}

var riskBtnFlag: boolean = false;


function createLoadingScreen(){
    const table = document.getElementById('data-list') as HTMLElement;
    table.innerHTML = '';
    const loading = document.createElement('div');
    loading.className='loading-wrapper';
    const loaderdiv = document.createElement('div');
    loaderdiv.className='loader-div';
    loading.appendChild(loaderdiv);

    table.appendChild(loading);
}
function sortByRisk(){

    if(riskBtnFlag){
        var updateArrow = document.createElement('i');
        updateArrow.className = 'arrow up';
        const doc = document.getElementById('riskBtn') as HTMLElement;
        doc.innerHTML = 'Risk Rating ';
        doc.appendChild(updateArrow);
        riskBtnFlag = !riskBtnFlag;
        orderType = 2;
        
        createLoadingScreen();
        LoadCoordinates();
    }else{
        var updateArrow = document.createElement('i');
        updateArrow.className = 'arrow down';
        const doc = document.getElementById('riskBtn') as HTMLElement;
        doc.innerHTML = 'Risk Rating ';
        doc.appendChild(updateArrow);
        riskBtnFlag = !riskBtnFlag;
        orderType = 1;
        createLoadingScreen();
        LoadCoordinates();
    };
}
export function DataTable(){
 
   const htmlcode = (
    <div className='data-table'>
        <div className='table-heading'>
            <button className='heading-button'>
                Asset Name
            </button>
            <button className='heading-button'>
                Business Category
            </button>
            <button className='heading-button' id='riskBtn'
            onClick={(e) => sortByRisk()}>
                Risk Rating <i className='arrow up'></i>
            </button>
            <button className='heading-button'>
                Year
            </button>
        </div>
        <div id='data-list'>

        </div>
    </div>);
    
    return htmlcode;
}

//sidebar controller
var sidebarControlFlag:boolean = false;
export const sidebarBtnController = (e) =>{
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const sidebarBtn = document.getElementById('sidebar-access-btn') as HTMLElement;
    sidebarControlFlag ? sidebar.style.animation ='fadeout 100ms linear backwards'
    : sidebar.style.animation = 'fade 100ms linear forwards';

    sidebarControlFlag ? sidebarBtn.style.rotate = '0deg'
    : sidebarBtn.style.rotate = '90deg';
    sidebarControlFlag = !sidebarControlFlag;

};

export function minMaxRisk(){
    const min = document.getElementById('minInputRisk') as HTMLElement;
    const max = document.getElementById('maxInputRisk') as HTMLElement;
    if(min.value < 0){
        min.value = 0;
    }
    if(max.value > 1){
        max.value = 1;
    }
    if(min.value > max.value){
        min.value = max.value;
    }
    if(max.value < min.value){
        max.value = min.value;
    }
    setMax(max.value);
    setMin(min.value);
    LoadCoordinates();

}