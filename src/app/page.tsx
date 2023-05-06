'use client'
import { MapBoxMap, DataTable, sidebarBtnController
, minMaxRisk} from './mapbox-map';
import { RiskChart } from './risk-chart';

var pageDiv = <MapBoxMap/>
export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div id='top-bar'>
          <button id='sidebar-access-btn' onClick={sidebarBtnController}></button>
          <button id='select-map' onClick={MapFunc}>Show Map</button>
          <button id='select-chart' onClick={ChartFunc}>Show Chart</button>
        </div>
        {/* control component for slider */}
        <div id='sidebar'>
          <div id='filter-div'>
            <h1 className='inputLabels' style={{left: 1+'vw'}}>Range: 0 to 1</h1>
            <label className='inputLabels' >Min</label>
            <input type='number' id='minInputRisk' name='minInputRisk' min={0} max={1} minLength={0}
            maxLength={0} defaultValue={0} step={0.01} placeholder='0'/>
            <label className='inputLabels' >Max</label>
            <input type='number' defaultValue={1} id='maxInputRisk' name='maxInputRisk' min={0} max={1} minLength={0}
            maxLength={0} step={0.01} placeholder='1'/>
            <button id='filterBtn' onClick={minMaxRisk}>Filter</button>
          </div>            
        </div>
        <div id='map-div-id' className="map-div relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div id='map-display'>
            <MapBoxMap/>
          </div>
          <div id='riskChart'>
            <RiskChart/>
          </div>
          
        </div>
        <div className="data-table-class relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <DataTable/>
        </div>
        
        
      </main>
  );
}
//pseudo paging these methods help with simulate paging but it just hides one existing div at a time
function MapFunc(){
  const map = document.getElementById('map-display') as HTMLElement;
  map.style.display='block';
  const risk = document.getElementById('riskChart') as HTMLElement;
  risk.style.display='none';
}
// needs to be updated to show actual paging 
// this method does reduce the lag and improves speed
function ChartFunc(){
  const map = document.getElementById('map-display') as HTMLElement;
  map.style.display='none';
  const risk = document.getElementById('riskChart') as HTMLElement;
  risk.style.display='block';
}
