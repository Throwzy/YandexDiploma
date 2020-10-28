import '../pages/index.css';
import {
    LOCAL_STORAGE_DATE,
    GRAPH_DATE,
    REQUEST
} from '../js/constants/constants';
import Statistics from "../js/components/Statistics";

const askedTitle = document.querySelector('.asked__title');
const inputValue = localStorage.getItem('inputStorage');
const weeklyNewsParagraph = document.querySelector('.asked__weekly-posts-counter');
const getTotalResults = localStorage.getItem('totalResults');
const getTotalCalls = localStorage.getItem('totalCalls');
const callsCell = document.querySelector('.asked__weekly-names-counter');

function youAsked() {
    askedTitle.textContent = `Вы спросили: «${inputValue}»`;
}

function weeklyNewsCounter() {
    weeklyNewsParagraph.textContent = getTotalResults;
}

function weeklyCalls() {
    callsCell.textContent = getTotalCalls;
}
youAsked()
weeklyNewsCounter()
weeklyCalls()

const statistics = new Statistics(LOCAL_STORAGE_DATE,GRAPH_DATE,REQUEST);
statistics.initializeStatistics()