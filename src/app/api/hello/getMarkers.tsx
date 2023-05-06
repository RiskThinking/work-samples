
const sheetID = process.env.NEXT_PUBLIC_SHEET_ID;
const baseURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'sample_data';
var dateYear = '';
var max = 1;
var min = 0;
//setters and getter to change output based on user input
export function setMin(val){
    min = val;
}

export function setMax(val){
    max = val;
}

export function setYear(year){
    dateYear = `${year}`;
}

export function getYear(){
    return dateYear;
}

var orderby = ''
var riskRange = '';
//the helper function returns a promise the coordinates based on year
async function getPositionData(orderType){
        orderType === 1 ? orderby = process.env.NEXT_PUBLIC_ORDER_BY_RISK_ASC || ''
        : orderType === 2 ? orderby = process.env.NEXT_PUBLIC_ORDER_BY_RISK_DESC || ''
        : orderby = '';
        riskRange = process.env.NEXT_PUBLIC_RISK_RANGE_MIN + min + " " + process.env.NEXT_PUBLIC_RISK_RANGE_MAX + max + " ";

        var queryData = process.env.NEXT_PUBLIC_GET_COORDINATES + dateYear + riskRange + orderby;
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
//the main function 
export async function getCoordinates(orderType){
    return getPositionData(orderType);
}