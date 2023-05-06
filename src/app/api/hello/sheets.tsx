
const sheetID = process.env.NEXT_PUBLIC_SHEET_ID;
const baseURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'sample_data';
var queryData = process.env.NEXT_PUBLIC_QUERY_YEARS;
var query = encodeURIComponent(queryData);
var url = `${baseURL}&sheet=${sheetName}&tq=${query}`; 
var data = [];
function setData(elements){
    data = elements;
}    

//returns just the years could split up the other scripts functions like this for readability
async function sheetDataProps(){
    
    
    const extracteddata = await Promise.resolve(fetch(url)
    .then( res => res.text())
    .then(rep => {
        const sheetData = JSON.parse(rep.substring(47).slice(0,-2));
        const datas = [];
        
        sheetData.table.rows.forEach((main) =>{
            const row = {};
            main.c.forEach((ele, ind) =>{
                row[ind] = ele.v;
            })
            datas.push(row);
        });
        
        return datas;
        
    }).catch(err => {
        return err;
    }));
    setData(extracteddata);
}

export function parse(){
    sheetDataProps();
    var json = data;
    //drop down selection menu
    let years = new Array();
    json.forEach((ele) => {
        const keys = Object.keys(ele);
        
        
        keys.forEach((key) => {
            years.push(ele[key]);
        });
    });
    
    let uniqueY = Array.from(new Set(years));

    return uniqueY.sort();
}


