
const dateToESFormat= (date:Date):string =>{ 
    const options:Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    
    const ESformat = new Intl.DateTimeFormat("es-ES", options).format(date);
    return ESformat;
}


export { 
    dateToESFormat
};