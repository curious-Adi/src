import "./App.css";
import "./assets/images/favicon-32x32.png";
import image from "./assets/images/icon-arrow.svg";
import { useState,useEffect } from "react";
function App() {
  // I/P pre onClick Event
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // O/P State post onClick Event
  const [dayOut, setDayOut] = useState("--");
  const [monthOut, setMonthOut] = useState("--");
  const [yearOut, setYearOut] = useState("--");

  let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //Error State
  const [flagDay, setFlagDay] = useState(false);
  const [dayText, setDayText] = useState("");

  const [flagMonth, setFlagMonth] = useState(false);
  const [monthText, setMonthText] = useState("");

  const [flagYear, setFlagYear] = useState(false);
  const [yearText, setYearText] = useState("");

  const isLeapYear = (year) => {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      return true;
    } else {
      return false;
    }
  };

  const callSub = () => {
    //Error State for Only Day--->

    if (day === "") {
      setFlagDay(true);
      setDayText("This field is required");
    } else if (+day > 31) {
      setFlagDay(true);
      setDayText("Must be a valid date");
    } else if (+day !== 29) {
      // If not 29 but the no of days is incorrect as per respective month
      if (day > monthDay[+month - 1] || day <= 0 || isNaN(day)) {
        setFlagDay(true);
        setDayText("Must be a valid date");
      }
      //If not 29 but the no of days is correct as per respective month
      else {
        setFlagDay(false);
        setDayText("");
      }
    }

    //Checking for the leap year - feb day
    else if (+day === 29) {
      //Case 1: Leap Year

      if (isLeapYear(+year) && +month === 2) {
        setFlagDay(false);
        setDayText("");
      }
      // Case 2: Non Leap Year
      else if (isLeapYear(+year) === false && +year !== 0 && +month === 2) {
        setFlagDay(true);
        setDayText("Must be a valid date");
      }

      // Case 3: Non Feb
      else {
        setFlagDay(false);
        setDayText("");
      }
    }
    //Error State for Only Month --->
    if (+month > 12 || +month <1) {
      setFlagMonth(true);
      setMonthText("Must be a valid month");
    } else if (month === "") {
      setFlagMonth(true);
      setMonthText("This field is required");
    } else if (isNaN(+month)) {
      setFlagMonth(true);
      setMonthText("Must be a valid month");
    } else if (+month <= 12 && +month >= 1) {
      setFlagMonth(false);
      setMonthText("");
    }

    //Error State for Only Year --->
    if (+year > 2023 || +year <= 0 || isNaN(+year)) {
      if (+year > 2023) {
        setFlagYear(true);
        setYearText("Must be in the past");
      } else {
        setFlagYear(true);
        setYearText("This field is required");
      }
    } else {
      setFlagYear(false);
      setYearText("");
    }
  };
  let nowDay, nowMonth, nowYear, ansDay, ansMonth, ansYear;
  const today = new Date();
  nowDay = today.getDate() + 1;
  nowMonth = today.getMonth() + 1;
  nowYear = today.getFullYear();
  
  //Age Calculator
  const ageCalculator = () => {
    //DAY Calculation
    if(flagDay === false && flagMonth === false && flagYear ===false){

      if (+day !== 29 && day <= monthDay[+month - 1] && day > 0 && !isNaN(+day) && day !== "") {
        if (nowDay - day >= 0) {
          setDayOut(+nowDay - day);
       
        } else {
          nowDay = nowDay + monthDay[nowMonth - 1];
          nowMonth = nowMonth - 1;
          ansDay = nowDay - day;
          setDayOut(ansDay);
     
        }
      } else if (
        +day === 29 &&
        +month === 2 &&
        isLeapYear(year) &&
        day !== "" &&
        !isNaN(+day)
      ) {
        if (nowDay - day >= 0) {
          setDayOut(+nowDay - day);
     
        } else {
          nowDay = nowDay + monthDay[nowMonth - 1];
          nowMonth = nowMonth - 1;
          ansDay = nowDay - day;
          setDayOut(ansDay);
        }
      } else if (+day === 29 && +month !== 2 && day !== "" && !isNaN(+day)) {
        if (nowDay - day >= 0) {
          setDayOut(+nowDay - day);
        
        } else {
          nowDay = nowDay + monthDay[nowMonth - 1];
          nowMonth = nowMonth - 1;
          ansDay = nowDay - day;
          setDayOut(ansDay);
        }
      }
     
      // MONTH Calculation
      if (month > 0 && month < 13 && month !== "" && !isNaN(+month)) {
        if (nowMonth - month >= 0) {
          setMonthOut(nowMonth - month);
        } else {
          nowMonth = nowMonth + 12;
          nowYear = nowYear - 1;
          ansMonth = nowMonth - month;
          setMonthOut(ansMonth);
        }
      }
     
      //// YEAR Calculation
  
      if (year <= nowYear && year !== "" && !isNaN(+year)) {
        if (nowYear - year >= 0) {
          ansYear = nowYear - year;
          setYearOut(ansYear);
        }
      }
     
      
    }else{
      setDayOut("--");
      setMonthOut("--");
      setYearOut("--");
    }
    
  };

  //This is Important for Rendering the whole Output section when the flag is true during Updation cycle
  useEffect(()=>{
 
    ageCalculator();
  },[flagDay,flagMonth,flagYear]);

  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-container-input">
            <span
              style={{
                color:
                  (flagDay || flagMonth || flagYear) && "hsl(0, 100%, 70%)",
              }}
            >
              DAY
            </span>
            <input
              type="text"
              placeholder="DD"
              id="day"
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
              style={{
                border: (flagDay || flagMonth || flagYear) && "1px solid red",
              }}
            />
            <small
              className="day-input-error"
              style={{ color: flagDay ? "red" : "white" }}
            >
              {dayText}
            </small>
          </div>

          <div className="main-container-input">
            <span
              style={{
                color:
                  (flagDay || flagMonth || flagYear) && "hsl(0, 100%, 70%)",
              }}
            >
              MONTH
            </span>
            <input
              type="text"
              placeholder="MM"
              id="month"
              value={month}
              onChange={(event) => {
                setMonth(event.target.value);
              }}
              style={{
                border: (flagDay || flagMonth || flagYear) && "1px solid red",
              }}
            />
            <small
              className="month-input-error"
              style={{ color: flagMonth ? "red" : "white" }}
            >
              {monthText}
            </small>
          </div>

          <div className="main-container-input">
            <span
              style={{
                color:
                  (flagDay || flagMonth || flagYear) && "hsl(0, 100%, 70%)",
              }}
            >
              YEAR
            </span>
            <input
              type="text"
              placeholder="YYYY"
              id="year"
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
              }}
              style={{
                border: (flagDay || flagMonth || flagYear) && "1px solid red",
              }}
            />
            <small
              className="year-input-error"
              style={{ color: flagYear ? "red" : "white" }}
            >
              {yearText}
            </small>
          </div>
        </div>
        <button
          className="submit"
          onClick={() => {
            callSub();
           ageCalculator();
          }}
        >
          <img src={image} alt="arrow" />
        </button>

        <div className="display">
          <h1>
            <span className="display-year">{yearOut}</span>
            years
          </h1>
          <h1>
            <span className="display-month">{monthOut}</span>months
          </h1>
          <h1>
            <span className="display-day">{dayOut}</span>days
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
