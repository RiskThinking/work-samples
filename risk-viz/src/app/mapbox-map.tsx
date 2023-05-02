'use client'
import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { parse } from './api/hello/sheets';
import { getCoordinates, setYear } from './api/hello/getMarkers';
import mapboxgl from 'mapbox-gl';
var dateYear = '';
var mapboxMarkers = [];
var geoJson = [];

export function getYear(){
    return dateYear;
}
function createHTML(uniqueY: any[]){
    dateYear = uniqueY[0];
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
    dateYear = year;
    setYear(year);
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


function setCoordinates(coords){
    geoJson = [];
    var temp = coords;
    temp?.forEach((ele) => {
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
}
const LoadCoordinates = async () => {
    try{
        const res = await getCoordinates();
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

export function MapBoxMap(){
    
   
    const [map, setMap] = useState<MapboxGL.Map>();
    const [lng, setLng] = useState(-79.3832);
    const [lat, setLat] = useState(43.6532);
    const [zoom, setZoom] = useState(5);
    const mapNode = useRef(null);
    if(!hasData){
        setData();
        hasData = data !== undefined && data?.length > 0 ? true : false;
        if(hasData){
            setYear(data[0]);
            htmlCode = createHTML(data);
            LoadCoordinates();
        }
    }
     if(!postedMarkers){
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
    if(mapNode !== null) return (<div className='map-container'><div ref={mapNode} style={{width: '90vw', height: '70vh'}}/>{htmlCode}</div>);
    
    return (<div className='loading-font-container'><p id='loading-text'>Loading Map...</p></div>);
}
