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
        const newsArray = this.sortMyData();
        const findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date().getDay()];
        const findDate = new Date(newsArray[0].publishedAt).getDate();
        const maxDate = findDate + ', ' + findDay;
        return maxDate
    }

    getSortedDates() {
        const newsArray = this.sortMyData();
        for (let i = 0; i < newsArray.length; i++) {
            const findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date(newsArray[i].publishedAt).getDay()];
            const findDate = new Date(newsArray[i].publishedAt).getDate();
            const maxDate = findDate + ', ' + findDay;
            newsArray[i].publishedAt = maxDate;
        }
        const newsArraySorted = newsArray;
        return newsArraySorted;
    }

    getFilteredDates(day) {
        const findDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] [new Date(new Date() - day * 24 * 3600 * 1000).getDay()];
        const findDate = new Date(new Date() - day * 24 * 3600 * 1000).getDate();
        const dayPlusDate = findDate + ', ' + findDay;
        return dayPlusDate;
    }

    getDates() {
        const dateArray = [];
        const dateMax = this.getCurrentDate();
        for (let i = 1; i <= 6; i++) {
            dateArray.unshift(this.getFilteredDates(i));
        }
        dateArray.push(dateMax);
        return dateArray;
    }

    getFilteredArray() {
        const datesArray = this.getDates();
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
        const array = this.getSortedDates();
        const dateObj = this. getFilteredArray();
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
        const data = JSON.parse(localStorage.getItem(this.storageData));
        const keyWord = localStorage.getItem('inputStorage');
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
    //     const data = JSON.parse(localStorage.getItem(this.storageData));
    // }

    setMonth() {
        function getMonth() {
            const month = new Date();
            const options = {
                month: 'long',
            };
            return month.toLocaleString('ru', options)
        }
        this.month.textContent = `ДАТА(${getMonth()})`;
    }

    setDaysCell() {
        const dates = this.getDates();
        for (let i = 0; i < 7; i++) {
            this.daysDateCell.children[i].textContent = dates[i];
        }
    }

    countAnalytics() {
        const keyWord = localStorage.getItem('inputStorage');
        const mentionsArray = [];
        const regexp = new RegExp(`${keyWord}`,`gi`);
        const weekArray = this.getNewsArray();
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
        const mentionsArray = this.countAnalytics();
        for (let i = 0; i < mentionsArray.length; i++) {
            this.infoPercentage.children[i].textContent = mentionsArray[i];
            if (mentionsArray[i] !== 0) {
                const widthPC = 11.3 * mentionsArray.length;
                const widthPad = 5.5 * mentionsArray[i];
                const widthPhone = 1.86 * mentionsArray[i];
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
