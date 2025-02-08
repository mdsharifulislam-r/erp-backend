export function generateDate() {
    const month= new Date().getMonth()+1;
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    if(month>=5){
        const rows = months.slice(months.findIndex(item=>item==(month-4)),months.findIndex(item=>item==(month+1)))
        return rows
        
        
    }else{

        const first =[]
        const second = months.slice(months.findIndex(item=>item==(12-(4-month))),12)

        for(let i=1;i<=month;i++){
            first.push(i)
        }

        
        const rows = [...second,...first]
        return rows

        

    }
    
}