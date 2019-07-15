var date = {
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    years: [2019, 2020, 2021, 2022, 2023]
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.markAsDone = this.markAsDone.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    //mark the selected item as done
    markAsDone(event) {
        this.props.handleMove(event.target);
    }
    //remove item from app
    removeItem(event) {
        if (event.target.classList.contains("remove")) {
            this.props.removeItem(event.target);
        }
    }
    render() {
        var updatedList = this.props.list;
        var displayedList = [];
        for (let i = 0; i < updatedList.length; i++) {
            displayedList.push(<li key={i} id={i} className={this.props.toRemove} onClick={this.removeItem}>{updatedList[i].task + " on " + updatedList[i].day + " " + updatedList[i].month + " " + updatedList[i].year}</li>)
        }
        return (
            <div>
                <h3 className="to-do title">To Do: </h3>
                <ul onClick={this.markAsDone} className="list">
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
        this.removeDoneItem = this.removeDoneItem.bind(this);
    }
    //mark the selected item to move back to todo
    markAsToDo(event) {
        this.props.handleMoveBack(event.target);
    }
    //remove selected item from app
    removeDoneItem(event) {
        if (event.target.classList.contains("remove")) {
            this.props.removeDoneItem(event.target);
        }
    }
    render() {
        var doneList = this.props.allDone;
        var displayedDone = [];
        for (let i = 0; i < doneList.length; i++) {
            displayedDone.push(<li key={i} id={i} className={this.props.toRemove} onClick={this.removeDoneItem}>{doneList[i].task + " on " + doneList[i].day + " " + doneList[i].month + " " + doneList[i].year}</li>)
        }
        return (
            <div>
                <h3 className="done title">Done: </h3>
                <ul onClick={this.markAsToDo} className="done-list">
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
            doneItems: [],
            toRemove: ""
        }
        this.saveNewItem = this.saveNewItem.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.moveBackToDo = this.moveBackToDo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeDoneItem = this.removeDoneItem.bind(this);
    }

    saveNewItem(input) {
        this.newTask = input;
    }
    //add the user's input to the existing to do list
    handleAdd(event) {
        event.preventDefault();
        var newItem = {
            task: this.newTask.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        }
        var allItems = this.state.listItems;
        allItems.push(newItem);
        this.setState({
            listItems: allItems
        })
    }
    //move the selected item to the done list
    moveToDone(selectedItem) {
        if (selectedItem.classList.contains("remove")) {
            this.setState({
                toRemove: ""
            })
        } else {
            var sliceIt = selectedItem.textContent.indexOf("on");
            var activity = selectedItem.textContent.slice(0, sliceIt);
            var activityDate = selectedItem.textContent.split(/\s(?=\w)/);
            var itemDone = {
                task: activity,
                day: activityDate[activityDate.length - 3],
                month: activityDate[activityDate.length - 2],
                year: activityDate[activityDate.length - 1]
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
    }
    //move the selected item back to the todo list
    moveBackToDo(selectedItem) {
        if (selectedItem.classList.contains("remove")) {
            this.setState({
                toRemove: ""
            })
        } else {
            var sliceIt = selectedItem.textContent.indexOf("on");
            var activity = selectedItem.textContent.slice(0, sliceIt);
            var activityDate = selectedItem.textContent.split(/\s(?=\w)/);
            var itemToDo = {
                task: activity,
                day: activityDate[activityDate.length - 3],
                month: activityDate[activityDate.length - 2],
                year: activityDate[activityDate.length - 1]
            }
            var toDoList = this.state.listItems;
            toDoList.push(itemToDo);
            var toDo = this.state.doneItems;
            toDo.splice(selectedItem.id, 1);
            this.setState({
                listItems: toDoList,
                doneItems: toDo
            })
        }
    }
    //remove the selected todo item
    handleRemove() {
        this.setState({
            toRemove: "remove"
        })
    }
    removeItem(itemToRemove) {
        var currentToDoList = this.state.listItems;
        currentToDoList.splice(itemToRemove.id, 1);
        this.setState({
            listItems: currentToDoList
        })
    }
    //remove the selected done item
    removeDoneItem(itemToRemove) {
        var currentDoneList = this.state.doneItems;
        currentDoneList.splice(itemToRemove.id, 1);
        this.setState({
            doneItems: currentDoneList
        })
    }
    renderOptions(arr) {
        var displayOptions = [];
        for (let i = 0; i < arr.length; i++) {
            displayOptions.push(<option key={arr[i]}>{arr[i]}</option>)
        }
        return displayOptions;
    }
    render() {
        return (
            <div>
                <div className="header">
                    <div className="bucket-list">My Bucket List</div>
                    <img className="logo" src="https://www.buckil.com/css/UIFront/images/trues.png" />
                </div>
                <div className="input-wrapper">
                    <div className="input-activity">
                        <div>Add an item:</div>
                        <input type="text" ref={this.saveNewItem}></input>
                    </div>
                    <div className="date-wrapper">
                        <select ref={x => this.day = x}>
                            {this.renderOptions(date.days)}
                        </select>
                        <select ref={x => this.month = x}>
                            {this.renderOptions(date.months)}
                        </select>
                        <select ref={x => this.year = x}>
                            {this.renderOptions(date.years)}
                        </select>
                    </div>
                    <input className="add-button" type="submit" value="Add" onClick={this.handleAdd}></input>
                </div>
                <List list={this.state.listItems} handleMove={this.moveToDone} toRemove={this.state.toRemove} removeItem={this.removeItem}></List>
                <Done allDone={this.state.doneItems} handleMoveBack={this.moveBackToDo} toRemove={this.state.toRemove} removeDoneItem={this.removeDoneItem}></Done>
                <input type="submit" value="Remove" onClick={this.handleRemove} className="remove-button"></input>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
)