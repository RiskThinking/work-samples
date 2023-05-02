

const sheetID = process.env.NEXT_PUBLIC_SHEET_ID;
const baseURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'sample_data';
var dateYear = '';

export function setYear(year){
    dateYear = `${year}`;
}

async function getPositionData(){
        var queryData = process.env.NEXT_PUBLIC_GET_COORDINATES + dateYear;
        
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

export async function getCoordinates(){
    return getPositionData();
}