import { getYear } from "./getMarkers";

const sheetID = process.env.NEXT_PUBLIC_SHEET_ID;
const baseURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'sample_data';
var year = '2030';
//default year placeholder in order to prevent a crash
//helper function which returns the asset names
async function getAssetData(){
    var queryData = process.env.NEXT_PUBLIC_ASSETS+'';
    var query = encodeURIComponent(queryData);
    var url = `${baseURL}&sheet=${sheetName}&tq=${query}`;
    
    const data = await Promise.resolve(fetch(url)
    .then( res => res.text())
    .then(rep => {
        const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
        const datas = [];
        sheetData.table.rows.forEach((main) =>{
            const row = {};
            main.c.forEach((ele, ind) => {
                row[ind] = ele.v;
            });
            datas.push(row);
        });
        return datas;
    }).catch(err => {
        console.log(err);
        return '';
    }));
    return data;
}
//function called outside of the script
export async function getAssets(){
    return getAssetData();
}

//returns business names
async function getBusinessData(){
    var queryData = process.env.NEXT_PUBLIC_BUSINESS+'';
    var query = encodeURIComponent(queryData);
    var url = `${baseURL}&sheet=${sheetName}&tq=${query}`;
    
    const data = await Promise.resolve(fetch(url)
    .then( res => res.text())
    .then(rep => {
        const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
        const datas = [];
        sheetData.table.rows.forEach((main) =>{
            const row = {};
            main.c.forEach((ele, ind) => {
                row[ind] = ele.v;
            });
            datas.push(row);
        });
        return datas;
    }).catch(err => {
        console.log(err);
        return '';
    }));
    return data;
}

export async function getBusiness(){
    return getBusinessData();
}
//returns chart data based on business name input
async function getBChartData(bname){
    var queryData = process.env.NEXT_PUBLIC_CHART_B + "'" +bname +"'";
    var query = encodeURIComponent(queryData);
    var url = `${baseURL}&sheet=${sheetName}&tq=${query}`;
    
    const data = await Promise.resolve(fetch(url)
    .then( res => res.text())
    .then(rep => {
        const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
        const datas = [];
        sheetData.table.rows.forEach((main) =>{
            const row = {};
            main.c.forEach((ele, ind) => {
                row[ind] = ele.v;
            });
            datas.push(row);
        });
        return datas;
    }).catch(err => {
        console.log(err);
        return '';
    }));
    return data;
}

export async function getBChart(bname){
    return getBChartData(bname);
}
//returns data input based on input names
async function getAChartData(aname){
    var queryData = process.env.NEXT_PUBLIC_CHART_A + "'" +aname +"'";
    var query = encodeURIComponent(queryData);
    var url = `${baseURL}&sheet=${sheetName}&tq=${query}`;
    
    const data = await Promise.resolve(fetch(url)
    .then( res => res.text())
    .then(rep => {
        const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
        const datas = [];
        sheetData.table.rows.forEach((main) =>{
            const row = {};
            main.c.forEach((ele, ind) => {
                row[ind] = ele.v;
            });
            datas.push(row);
        });
        return datas;
    }).catch(err => {
        console.log(err);
        return '';
    }));
    return data;
}

export async function getAChart(aname){
    return getAChartData(aname);
}