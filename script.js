//Input Handle
const getDay = document.querySelector('#day');
const getMonth = document.querySelector('#month');
const getYear = document.querySelector('#year');
const getSubmit = document.querySelector('button');
//Output Handle
const displayDay = document.querySelector('.display-day');
const displayMonth = document.querySelector('.display-month');
const displayYear = document.querySelector('.display-year');

//Output Errors
const dayEr = document.querySelector('.day-input-error');
const monthEr = document.querySelector('.month-input-error');
const yearEr = document.querySelector('.year-input-error');

//Event Listeners
let clickSubmit = getSubmit.addEventListener('click', (s)=>{
    console.log(s.clickSubmit)});