function firstDayWeek(a,b){
    let c = new Date(b)
    if(a === 1){
        c.setHours(24)
        return formattedDate(c) 
    }
    let dayPlus = a*7*24
    c.setHours(dayPlus-123)
   
        function getWeekDay(date) {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()-1];
        }
        function formattedDate(d) {
            let month = String(d.getMonth() + 1);
            let day = String(d.getDate()-1);
            let b = String(d.getFullYear());
            
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            if (b.length === 1) b = '000' + b;
            if (b.length === 2) b = '00' + b;
            if (b.length === 3) b = '0' + b; 
            
            
            return `${day}-${month}-${b}`;
        }
        for(let i = 0;i<7;i++){
            let today = getWeekDay(c)
            if(today === 'Monday'){
                let res = formattedDate(c)
                return res
            }
            c.setHours(-24)    
        }
        return c
    }