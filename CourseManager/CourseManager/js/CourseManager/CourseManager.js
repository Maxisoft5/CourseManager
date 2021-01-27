$(document).ready(function(){
    HideCreateForm();
    HideEditForm();
    let calendar = document.getElementById("calendar");
    let userName = sessionStorage.getItem("username");
    let greetings = document.getElementById("greetings");
    greetings.innerText = "Привет, " + userName;
    for (let row = 0; row < calendar.rows.length; row++)
    {
        for (let cell = 0; cell < calendar.rows[row].cells.length; cell++)
        {
            calendar.rows[row].cells[cell].onclick = () => { ShowEditForm(); };
            calendar.rows[row].cells[cell].id = `${row}${cell}`;
            calendar.rows[row].cells[cell].classList.add("cells");
        }
    }
});

$('cells').click(function() { 
    var id = $(this).attr('id');
    $container.cycle(id.replace('#', '')); 
    sessionStorage.setItem("cellId", id);
});

function CreateCourse() {
    let courseManager = new CourseManager();
    let dayOfWeek = document.getElementById("days").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;
    let time = courseManager._startTimes.get(startTime);
    let column = courseManager._daysOfWeek.get(dayOfWeek);
    let id = `${time}${column+1}`;
    let name = document.getElementById("courseName").value;
    let description = document.getElementById("description").value;
    let cost = document.getElementById("cost").value;
    let eventCalendar = document.getElementById("eventCalendar");
    CourseManager.createCourse(id, name, description, cost, dayOfWeek, startTime, endTime);
    if(CourseManager._courses.length === 0)
    {
        let title = document.createElement("p");
        title.innerText = "Events";
        eventCalendar.appendChild(title);
    }
    let event = document.createElement("li");
    event.id = id;
    event.innerText = ` ${++CourseManager._count}. - ${name} - ${description} - ${cost} - ${dayOfWeek} - ${startTime} - ${endTime}`;
    eventCalendar.setAttribute("style", "list-style-type: none;");
    eventCalendar.appendChild(event);
    $("#emptyCalendar").hide();
    document.getElementById("createCourseBtn").value = "Добавить курс";
}

function EditCourse() {
    let courseManager = new CourseManager();
    let dayOfWeek = document.getElementById("days").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;
    let time = courseManager._startTimes.get(startTime);
    let column = courseManager._daysOfWeek.get(dayOfWeek);
    let id = `${time}${column+1}`;
    let name = document.getElementById("courseName").value;
    let description = document.getElementById("description").value;
    let cost = document.getElementById("cost").value;
    let eventCalendar = document.getElementById("eventCalendar");
    CourseManager.EditCourse(id, name, description, cost, dayOfWeek, startTime, endTime);
    let event = document.getElementById(`${sessionStorage.getItem(cellId)}`);
    event.innerText = `${++CourseManager._count}. - ${name} - ${description} - ${cost} - ${dayOfWeek} - ${startTime} - ${endTime}`;
}   

function DeleteCourse() {
    let id = sessionStorage.getItem("cellId");
    let event = document.getElementById(`${sessionStorage.getItem(cellId)}`);
    event.remove();
    CourseManager.deleteCourse(id);
}

function ShowCreateForm() {
    $("#createCourseForm").show();
}

function HideCreateForm() {
    $("#createCourseForm").hide();
}

function ShowEditForm() {
    $("#editCourseForm").show();
}

function HideEditForm() {
    $("#editCourseForm").hide();
}

class CourseManager {

    static _courses = new Array();
    static _startTimes = new Map();
    static _daysOfWeek = new Map();
    static _count = 0;

    static getCourses() {
        console.log(this._courses);
        return this._courses;
    }

    static getCourse(id) {
        let course = this._courses.find(x => x.id === id);
        console.log(course);
        return course;
    }

    static createCourse(id, name, description, cost, dayOfWeek, startTime, endTime) {
        let course = new Course(id, name, description, cost, dayOfWeek, startTime, endTime);
        console.log(course);
        var td = document.getElementById(`${id}`);
        td.innerText = name;
        this._courses.push(course);
        HideCreateForm();
    }

    static deleteCourse(id) {
        let course = this._courses.find(x => x.id === id);
        if(course != undefined) {
        var index = this._courses.indexOf(course);
         this._courses.slice(index, 1);
         var td = document.getElementById(`${id}`);
         td.innerText = "";
        } else {
            console.log(`Course with id ${id} dosen't exist`);
        }
        console.log(course);
    }

     constructor() {
        this._startTimes = new Map();
        this._daysOfWeek = new Map();
        this._startTimes.set("9:00",0);
        this._startTimes.set("10:00",1);
        this._startTimes.set("11:00",2);
        this._startTimes.set("12:00",3);
        this._startTimes.set("13:00",4);
        this._startTimes.set("14:00",5);
        this._startTimes.set("15:00",6);
        this._startTimes.set("16:00",7);
        this._startTimes.set("17:00",8);
        this._daysOfWeek.set("Пн", 0);
        this._daysOfWeek.set("Вт",1);
        this._daysOfWeek.set("Ср",2);
        this._daysOfWeek.set("Чт",3);
        this._daysOfWeek.set("Пт",4);
    }
}

class Course {

    getId() {
        return this._id;
    }

    getName() {
        console.log(this._name);
        return this._name;
    }

    getDescription() {
        console.log(this._description);
        return this._description;
    }

    getCost() {
        console.log(this._cost);
        return this._cost;
    }

    getDayOfWeek() {
        console.log(this._dayOfWeek);
        return this._dayOfWeek;
    }

    getTime() { 
        console.log(this._time);
        return this._time;
    }

    constructor(id, name, description, cost, dayOfWeek, startTime, endTime){
        this._id = id;
        this._name = name;
        this._description = description;
        this._cost = cost;
        this._dayOfWeek = dayOfWeek;
        this._startTime = startTime;
        this._endTime = endTime;
    }
}

function redirect() {
	window.location = "singInForm.html"
}



