
import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxMap } from 'react-map-gl';

function MapBoxMap(){
    const [map, setMap] = useState<MapboxGL.Map>();
    const [lng, setLng] = useState(-79.3832);
    const [lat, setLat] = useState(43.6532);
    const [zoom, setZoom] = useState(10);
    const mapNode = useRef(null);
    
    useEffect(() => {
        const refContainer = mapNode.current;

        if(typeof window === "undefined" || refContainer == null) return;

        const mapboxMap = new MapboxGL.Map({
            container: refContainer,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        mapboxMap.addControl(new MapboxGL.NavigationControl(), 'top-right');
        mapboxMap.on('move', () => {
            setLng(mapboxMap.getCenter().lng);
            setLat(mapboxMap.getCenter().lat);
            setZoom(mapboxMap.getZoom());
        });
        setMap(mapboxMap);
        return () => mapboxMap.remove();
        
    }, []);
    if(mapNode !== null) return (<div className='map-container'><div ref={mapNode} style={{width: '90vw', height: '50vh'}}/></div>);
    
    return (<div className='loading-font-container'><p id='loading-text'>Loading Map...</p></div>);
}

export default MapBoxMap