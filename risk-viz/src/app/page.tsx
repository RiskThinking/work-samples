import { Inter } from 'next/font/google';
import { MapBoxMap, DataTable, sidebarBtnController
, minMaxRisk} from './mapbox-map';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div id='top-bar'>
          <button id='sidebar-access-btn' onClick={sidebarBtnController}>

          </button>
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
        <div className="map-div relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <MapBoxMap/>
          
          
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <DataTable/>
        </div>
        
        
      </main>
  );
}

