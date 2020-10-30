export default class Statistics {
    constructor(storageData,month,daysDateCell,infoPercentage) {
        this.storageData = storageData;
        this.month = month;
        this.daysDateCell = daysDateCell;
        this.infoPercentage = infoPercentage;
    }

    sortMyData() {
        if (this.storageData in localStorage) {
            const newsArray = JSON.parse(localStorage.getItem(`${this.storageData}`));
            for (let i = 0; i < newsArray.length; i++) {
                newsArray.sort(function (a, b) {
                    return (
                        Math.round(new Date(b.publishedAt).getTime()) -
                        Math.round((new Date(a.publishedAt).getTime()))
                    )
                })
                return newsArray;
            }
        }
    }

    getCurrentDate() {
        let newsArray = this.sortMyData();
        let findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date().getDay()];
        let findDate = new Date(newsArray[0].publishedAt).getDate();
        let maxDate = findDate + ', ' + findDay;
        return maxDate
    }

    getSortedDates() {
        let newsArray = this.sortMyData();
        for (let i = 0; i < newsArray.length; i++) {
            let findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date(newsArray[i].publishedAt).getDay()];
            let findDate = new Date(newsArray[i].publishedAt).getDate();
            let maxDate = findDate + ', ' + findDay;
            newsArray[i].publishedAt = maxDate;
        }
        let newsArraySorted = newsArray;
        return newsArraySorted;
    }

    getFilteredDates(day) {
        let findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date(new Date() - day * 24 * 3600 * 1000).getDay()];
        let findDate = new Date(new Date() - day * 24 * 3600 * 1000).getDate();
        let dayPlusDate = findDate + ', ' + findDay;
        return dayPlusDate;
    }

    getDates() {
        let dateArray = [];
        let dateMax = this.getCurrentDate();
        for (let i = 1; i <= 6; i++) {
            dateArray.unshift(this.getFilteredDates(i));
        }
        dateArray.push(dateMax);
        return dateArray;
    }

    getFilteredArray() {
        let datesArray = this.getDates();
        const getInitObject = function(array) {
            return array.reduce((acc,current) => {
                acc[current] = [];
                return acc;
            }, {});
        }
        const datesObject = getInitObject(datesArray);
        return datesObject;
    }

    getNewsArray() {
        let array = this.getSortedDates();
        let dateObj = this. getFilteredArray();
        for (let key in dateObj) {
            for (let i = 0; i < array.length; i++) {
                if (key === array[i].publishedAt) {
                    dateObj[key] = [...dateObj[key],array[i]];
                }
            }
        }
        return dateObj;
    }

    mentionCounter() {
        let data = JSON.parse(localStorage.getItem(this.storageData));
        let keyWord = localStorage.getItem('inputStorage');
        let counter = 0;
        const regexp = new RegExp(`${keyWord}`,`gi`);
        data.map((item) => item.title).forEach((elem) => {
            if (elem.match(regexp)) {
                counter += 1;
            }
        });
        return counter;
    }

    // keyWordRenew() {
    //     let data = JSON.parse(localStorage.getItem(this.storageData));
    // }

    setMonth() {
        function getMonth() {
            let month = new Date();
            let options = {
                month: 'long',
            };
            return month.toLocaleString('ru', options)
        }
        this.month.textContent = `ДАТА(${getMonth()})`;
    }

    setDaysCell() {
        let dates = this.getDates();
        for (let i = 0; i < 7; i++) {
            this.daysDateCell.children[i].textContent = dates[i];
        }
    }

    countAnalytics() {
        let keyWord = localStorage.getItem('inputStorage');
        let mentionsArray = [];
        const regexp = new RegExp(`${keyWord}`,`gi`);
        let weekArray = this.getNewsArray();
        for (let day in weekArray) {
            let counter = 0;
            weekArray[day].map((item) => item.title).forEach((elem) => {
                if (elem !== null) {
                    if (elem.match(regexp)) {
                        counter += 1;
                    }
                }
            })
            weekArray[day].map((item) => item.description).forEach((elem) => {
                if (elem !== null) {
                    if (elem.match(regexp)) {
                        counter += 1;
                    }
                }
            })
            mentionsArray.push(counter);
        }
        return mentionsArray
    }

    renderAnalytics() {
        let mentionsArray = this.countAnalytics();
        for (let i = 0; i < mentionsArray.length; i++) {
            this.infoPercentage.children[i].textContent = mentionsArray[i];
            if (mentionsArray[i] !== 0) {
                let widthPC = 11.3 * mentionsArray.length;
                let widthPad = 5.5 * mentionsArray[i];
                let widthPhone = 1.86 * mentionsArray[i];
                this.infoPercentage.children[i].style.width = `${widthPC}px`;
                if ('screen and (min-width: 768px) and (max-width: 1250px)') {
                    this.infoPercentage.children[i].style.width = `${widthPad}px`;
                }
                if (window.matchMedia('screen and (min-width: 320px) and (max-width: 767px)').matches) {
                    this.infoPercentage.children[i].style.width = `${widthPhone}px`;
                }
            }
            else {
                this.infoPercentage.children[i].style.width = `15px`;
            }
        }
    }

    startAll() {
        this.setMonth()
        this.setDaysCell();
        this.countAnalytics();
        this.renderAnalytics();
    }


























}
