
const sheetID = (process.env.NEXT_PUBLIC_SHEET_ID || '');
const baseURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'sample_data';
var dateYear:any = '';
var max:number = 1;
var min:number = 0;
//setters and getter to change output based on user input
export function setMin(val:number){
    min = val;
}

export function setMax(val:number){
    max = val;
}

export function setYear(year:any){

    dateYear = `${year}`;
}

export function getYear(){
    return dateYear;
}

var orderby = ''
var riskRange = '';
//the helper function returns a promise the coordinates based on year
async function getPositionData(orderType:any){
        orderType === 1 ? orderby = process.env.NEXT_PUBLIC_ORDER_BY_RISK_ASC || ''
        : orderType === 2 ? orderby = process.env.NEXT_PUBLIC_ORDER_BY_RISK_DESC || ''
        : orderby = '';
        riskRange = (process.env.NEXT_PUBLIC_RISK_RANGE_MIN || '') + min + " " + (process.env.NEXT_PUBLIC_RISK_RANGE_MAX || '') + max + " ";

        var queryData = (process.env.NEXT_PUBLIC_GET_COORDINATES || '') + dateYear + riskRange + orderby;
        var query = encodeURIComponent(queryData);
        var url = `${baseURL}&sheet=${sheetName}&tq=${query}`;
        
        const data = await Promise.resolve(fetch(url)
        .then( res => res.text())
        .then(rep => {
            const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
            const datas:any[] = [];
            sheetData.table.rows.forEach((main:any) =>{
                const row:any = {};
                main.c.forEach((ele:any, ind:any) => {
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
export async function getCoordinates(orderType:any){
    return getPositionData(orderType);
}