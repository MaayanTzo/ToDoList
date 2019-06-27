var date = {
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    years: [2019, 2020, 2021, 2022, 2023]
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.markAsDone = this.markAsDone.bind(this);
    }
    markAsDone(event) {
        //console.log(event.target);
        //console.log(event.target.id);
        this.props.handleMove(event.target);
    }
    render() {
        var updatedList = this.props.list;
        var displayedList = [];
        for (let i = 0; i < updatedList.length; i++) {
            displayedList.push(<li key={i} id={i}>{updatedList[i].task + " on " + updatedList[i].day + " " + updatedList[i].month + " " + updatedList[i].year}</li>)
        }
        return (
            <div>
                <h3>To Do: </h3>
                <ul onClick={this.markAsDone}>
                    {displayedList}
                </ul>
            </div>
        )
    }
}
class Done extends React.Component {
    constructor(props) {
        super(props);
        this.markAsToDo = this.markAsToDo.bind(this);
    }
    markAsToDo(event) {
        //console.log(event.target);
        this.props.handleMoveBack(event.target);
    }
    render() {
        var doneList = this.props.allDone;
        var displayedDone = [];
        for (let i = 0; i < doneList.length; i++) {
            displayedDone.push(<li key={i} id={i}>{doneList[i].task + " on " + doneList[i].day + " " + doneList[i].month + " " + doneList[i].year}</li>)
        }
        return (
            <div>
                <h3>Done: </h3>
                <ul onClick={this.markAsToDo}>
                    {displayedDone}
                </ul>
            </div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            doneItems: []
        }
        this.getDay = this.getDay.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.getYear = this.getYear.bind(this);
        this.saveNewItem = this.saveNewItem.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.moveBackToDo = this.moveBackToDo.bind(this);
    }
    getDay(input) {
        this.day = input;
    }
    getMonth(input) {
        this.month = input;
    }
    getYear(input) {
        this.year = input;
    }
    saveNewItem(input) {
        this.newTask = input;
    }
    handleAdd(event) {
        event.preventDefault();
        var newItem = {
            task: this.newTask.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        }
        //console.log(newItem);
        var allItems = this.state.listItems;
        allItems.push(newItem);
        //console.log(allItems);
        this.setState({
            listItems: allItems
        })
    }
    moveToDone(selectedItem) {
        var sliceIt = selectedItem.textContent.indexOf("on");
        console.log(sliceIt);
        var activity = selectedItem.textContent.slice(0, sliceIt);
        console.log(activity);
        var activityDate = selectedItem.textContent.split(/\s(?=\w)/);
        console.log(activityDate);
        var itemDone = {
            task: activity,
            day: activityDate[2],
            month: activityDate[3],
            year: activityDate[4]
        }
        var doneList = this.state.doneItems;
        doneList.push(itemDone);
        var done = this.state.listItems;
        done.splice(selectedItem.id, 1);
        this.setState({
            listItems: done,
            doneItems: doneList
        })
    }
    moveBackToDo(selectedItem) {
        console.log(selectedItem);
        var sliceIt = selectedItem.textContent.indexOf("on");
        var activity = selectedItem.textContent.slice(0, sliceIt);
        console.log(activity);
        var activityDate = selectedItem.textContent.split(/\s(?=\w)/);
        console.log(activityDate);
        var itemToDo = {
            task: activity,
            day: activityDate[2],
            month: activityDate[3],
            year: activityDate[4]
        }
        //console.log(itemToDo);
        var toDoList = this.state.listItems;
        toDoList.push(itemToDo);
        var toDo = this.state.doneItems;
        toDo.splice(selectedItem.id, 1);
        this.setState({
            listItems: toDoList,
            doneItems: toDo
        })
    }
    render() {
        //var days=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
        var displayDays = [];
        for (let i = 0; i < date.days.length; i++) {
            displayDays.push(<option key={date.days[i]}>{date.days[i]}</option>)
        }
        //var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var displayMonths = [];
        for (let i = 0; i < date.months.length; i++) {
            displayMonths.push(<option key={date.months[i]}>{date.months[i]}</option>)
        }
        //var years=["2019","2020","2021","2022","2023"];
        var displayYears = [];
        for (let i = 0; i < date.years.length; i++) {
            displayYears.push(<option key={date.years[i]}>{date.years[i]}</option>)
        }
        return (
            <div>
                <input type="text" ref={this.saveNewItem}></input>
                <div>
                    <select ref={this.getDay}>
                        {displayDays}
                    </select>
                    <select ref={this.getMonth}>
                        {displayMonths}
                    </select>
                    <select ref={this.getYear}>
                        {displayYears}
                    </select>
                </div>
                <input type="submit" value="Add" onClick={this.handleAdd}></input>
                <List list={this.state.listItems} handleMove={this.moveToDone}></List>
                <Done allDone={this.state.doneItems} handleMoveBack={this.moveBackToDo}></Done>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
)