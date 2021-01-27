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
    console.log(CourseManager._courses);
    console.log(CourseManager._courses.length);
    let dayOfWeek = document.getElementsByName("days").value;
    let startTime = document.getElementsByName("startTime").value;
    let endTime = document.getElementsByName("endTime").value;
    let time = CourseManager._startTimes.get(startTime);
    let column = CourseManager._daysOfWeek.get(dayOfWeek);
    let id = `${time}${column}`;
    let name = document.getElementsByName("courseName");
    let description = document.getElementsByName("description");
    let cost = document.getElementsByName("cost");
    let eventCalendar = document.getElementById("eventCalendar");
    CourseManager.createCourse(id, name, description, cost, dayOfWeek, startTime, endTime);
    if(CourseManager._courses.length === 0)
    {
        let title = document.createElement("p");
        title.innerText = "Events";
        eventCalendar.append(title);
    }
    let event = document.createElement("li");
    event.innerText = $`${name} - ${description} - ${cost} - ${dayOfWeek} - ${startTime} - ${endTime}`;
    eventCalendar.append(event);
    $("#emptyCalendar").hide();
}

function EditCourse() {
    console.log(CourseManager._courses);
    console.log(CourseManager._courses.length);
    let id = CourseManager._courses.length + 1;
    let name = document.getElementsByName("courseName");
    let description = document.getElementsByName("description");
    let cost = document.getElementsByName("cost");
    let dayOfWeek = document.getElementsByName("days").value;
    let startTime = document.getElementsByName("startTime").value;
    let endTime = document.getElementsByName("endTime").value;
    CourseManager.EditCourse(id, name, description, cost, dayOfWeek, startTime, endTime);
}   

function DeleteCourse() {
    let id = sessionStorage.getItem("cellId");
    CourseManager.deleteCourse(id);
}

function ShowCreateForm(){
    $("#createCourseForm").show();
}

function HideCreateForm(){
    $("#createCourseForm").hide();
}

function ShowEditForm(){
    $("#editCourseForm").show();
}

function HideEditForm(){
    $("#editCourseForm").hide();
}

class CourseManager {
    static _courses = new Array();
    static _startTimes = new Map();
    static _daysOfWeek = new Map();

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
        var td = document.getElementById("id");
        td.innerText = name;
        this._courses.push(course);
        HideCreateForm();
    }

    static deleteCourse(id) {
        let course = this._courses.find(x => x.id === id);
        if(course != undefined) {
        var index = this._courses.indexOf(course);
         this._courses.slice(index, 1);
        } else {
            console.log(`Course with id ${id} dosen't exist`);
        }
        console.log(course);
    }

    constructor(userName) {
        let greetings = document.getElementById("greetings");
        greetings.innerText = "Привет, " + userName;
        _startTimes.Map("9:00",0);
        _startTimes.Map("10:00",1);
        _startTimes.Map("11:00",2);
        _startTimes.Map("12:00",3);
        _startTimes.Map("13:00",4);
        _startTimes.Map("14:00",5);
        _startTimes.Map("15:00",6);
        _startTimes.Map("16:00",7);
        _startTimes.Map("17:00",8);
        _daysOfWeek.Map("Пн", 0);
        _daysOfWeek.Map("Вт",1);
        _daysOfWeek.Map("Ср",2);
        _daysOfWeek.Map("Чт",3);
        _daysOfWeek.Map("Пт",4);
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


