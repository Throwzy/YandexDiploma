import monthChanger from "../constants/monthChanger";

export default class DataChanger {
    constructor(date) {
        this.date = date;
    }
    newsTimeChanger() {
        const normalDate = date.substr(0,10)
        const yearNumber = normalDate.substr(0,4)
        const monthNumber = normalDate.substr(4,7)
        const dayNumber = normalDate.substr(7,10)
        const changedDate = dayNumber + monthChanger[monthNumber] + yearNumber;
        return changedDate
    }
}