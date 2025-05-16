
export const getTimePeriodInDays = (date1:Date, date2:Date):number=>{
    const day = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(differenceInMilliseconds / day);
}