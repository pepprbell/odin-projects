// calendar by Alvaro https://codepen.io/alvarotrigo/pen/bGLpROa

//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

// modified by Pepprbell
// Disabled previous dates
// Button lit up after click date
// Modal show up after click button
// Modified CSS

function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["일", "월", "화", "수", "목", "금", "토"],
    calMonthName: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
      calendarControl.disableIfThisMonth();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
      calendarControl.disableIfThisMonth();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    disableIfThisMonth: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      if (calendar.getFullYear() == calendarControl.localDate.getFullYear() &&
      calendar.getMonth() == calendarControl.localDate.getMonth()) {
        prevBtn.classList.add('disable')
        prevBtn.removeEventListener("click",calendarControl.navigateToPreviousMonth)
      } else {
        prevBtn.classList.remove('disable')
      }
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear() + '.';
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      const before = document.querySelector('.calendar-selected')
      const button = document.querySelector('.calendar-button')
      if (before) {before.classList.toggle('calendar-selected')}
      e.target.parentNode.classList.add('calendar-selected')
      button.classList.add('active-button')
      button.addEventListener('click',reserve)
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-year-label"></div>
        <div class="calendar-month-label"></div>
        </div>
        <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      
      let firstDayAvailable = calendarControl.firstDayNumber()
      if (calendar.getFullYear() == calendarControl.localDate.getFullYear() &&
          calendar.getMonth() == calendarControl.localDate.getMonth()) {
        firstDayAvailable += calendarControl.localDate.getDay() + 1
      }
      
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else if (firstDayAvailable !== calendarControl.firstDayNumber() &&
                   i < firstDayAvailable) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates">${count++}</div>`;
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }

      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      for (var i = 0; i < dateNumber.length; i++) {
          dateNumber[i].addEventListener(
            "click",
            calendarControl.selectDate,
            false
          );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [0].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function(dates){
      dates.reverse();
      for(let i=0;i<dates.length;i++) {
          if(document.querySelectorAll(".prev-dates")) {
              document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
          }
      }
    },
    plotNextMonthDates: function(){
     let childElemCount = document.querySelector('.calendar-body').childElementCount;
     //7 lines
     if(childElemCount > 42 ) {
         let diff = 49 - childElemCount;
         calendarControl.loopThroughNextDays(diff);
     }

     //6 lines
     if(childElemCount > 35 && childElemCount <= 42 ) {
      let diff = 42 - childElemCount;
      calendarControl.loopThroughNextDays(42 - childElemCount);
     }

    },
    loopThroughNextDays: function(count) {
      if(count > 0) {
          for(let i=1;i<=count;i++) {
              document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
          }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
      calendarControl.disableIfThisMonth();
    }
  };
  calendarControl.init();
}

let calendarControl;

const reservation = document.querySelector('calendar-button')

function reserve(e) {
  const modal = document.querySelector('.modal')
  e.target.disabled = true
  setTimeout(() => {
    e.target.disabled = false
  }, 2400);

  modal.classList.add('modal-on')

  const modalTimer = () => {
    modal.classList.add('modal-timer')
    setTimeout(modalOff, 2000)
  }

  const modalOff = () => {
    modal.classList.remove('modal-on')
    modal.classList.remove('modal-timer')
  }
  setTimeout(modalTimer, 200)
}

const load = () => {
  const content = document.querySelector('#content')

  const nav = () => {
    const h4s = [domFactory('h4','','home'),domFactory('h4','','menu'),domFactory('h4','','book')]
    const h4Container = domFactory('div','','')
    h4s.forEach(h4 => h4Container.appendChild(h4))

    const moon = domFactory('div','moon','')
    const blanket = domFactory('div','','')
    blanket.appendChild(moon)
    blanket.appendChild(h4Container)

    const navDiv = domFactory('div','nav','')
    navDiv.appendChild(blanket)

    // const img = domFactory('div','img','')
    // content.appendChild(img)
    content.appendChild(navDiv)
  }

  const home = () => {

    const h1 = domFactory('h1','','')
    const span = domFactory('span','logo','Butter<br>PamPam')
    h1.appendChild(span)

    const homeDiv = domFactory('div','home','')
    // homeDiv.appendChild(img)
    homeDiv.appendChild(h1)

    content.appendChild(homeDiv)
  }

  const menu = () => {
    const board = domFactory('div','menu-board','')
    const detail = domFactory('div','menu-content','')
    const coffee = [['COFFEE','','',
                     '','HOT','COLD',
                     '에스프레소','2.5','2.5',
                     '아메리카노','3.0','3.0',
                     '카페 라떼','4.0','4.5',
                     '바닐라 라떼', '4.5','5.0',
                     '카푸치노','4.5','5.0',
                     '카페모카','5.0','5.5'],
                    ['BEVERAGES','','',
                     '','HOT','COLD',
                     '허니밀크','3.5','4.0',
                     '초코 라떼','4.5','5.0',
                     '그린티 라떼','4.5','5.0',
                     '로얄 밀크티','5.0','5.5',
                     '아이스티','','3.5'],
                    ['FRUIT TEA','','',
                     '','HOT','COLD',
                     '자몽티','3.5','4.0',
                     '레몬티','3.5','4.0',
                     '생강티','3.5','4.0',
                     '유자티','3.5','4.0']]
    for (let i = 0; i < 3; i++) {
      const part = domFactory('div','','')
      for (let j = 0; j < coffee[i].length; j++) {
        part.appendChild(domFactory('p','',coffee[i][j]))
      }
      detail.appendChild(part)
    }
    board.appendChild(detail)
    for (let i = 0; i <= 3; i++) {
      board.appendChild(domFactory('div','',''))
    }

    const menuDiv = domFactory('div','menu','')
    menuDiv.appendChild(board)

    content.appendChild(menuDiv)
  }

  const book = () => {
    const calendar = domFactory('div','calendar','')
    const button = domFactory('button','calendar-button','reserve')
    const modal = domFactory('div','modal','reserved!')

    const blanket = domFactory('div','','')
    blanket.appendChild(calendar)
    blanket.appendChild(button)
    blanket.appendChild(modal)

    const bookDiv = domFactory('div','book','')
    bookDiv.appendChild(blanket)

    content.appendChild(bookDiv)
    calendarControl = new CalendarControl()
  }

  nav()
  home()
  menu()
  book()
}

const domFactory = (type, className, text) => {
  const element = document.createElement(type)
  className ? element.classList.add(className) : ''
  element.innerHTML = text
  return element
}

const loader = load()

const slide = (e) => {
  const tabs = [document.querySelector('.home'),document.querySelector('.menu'),document.querySelector('.book')]
  const body = document.querySelector('body')
  switch (e.target.innerHTML) {
    case 'home':
      body.classList.remove('shade')
      tabs[0].style.left = '0'
      tabs[1].style.left = '100vw'
      tabs[2].style.left = '200vw'
      break
    case 'menu':
      body.classList.add('shade')
      tabs[0].style.left = '-100vw'
      tabs[1].style.left = '0'
      tabs[2].style.left = '100vw'
      break
    case 'book':
      body.classList.add('shade')
      tabs[0].style.left = '-200vw'
      tabs[1].style.left = '-100vw'
      tabs[2].style.left = '0'
      break
  }
}

const navButtons = [...document.querySelectorAll('.nav h4')]
navButtons.forEach(navButton => navButton.addEventListener('click',slide))