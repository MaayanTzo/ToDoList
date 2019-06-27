var date = {
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    years: [2019, 2020, 2021, 2022, 2023]
}
class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div></div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        this.saveNewItem = this.saveNewItem.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    saveNewItem(input) {
        this.newTask = input;
    }
    handleAdd(event) {
        event.preventDefault();
        var newItem = {
            task: this.newTask.value,
            day: "c"
        }
        var task = this.newTask.value;
        this.setState({
            listItems: this.state.listItems.push(task)
        })
        debugger;
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
                    <select>
                        {displayDays}
                    </select>
                    <select>
                        {displayMonths}
                    </select>
                    <select>
                        {displayYears}
                    </select>
                </div>
                <input type="submit" value="Add" onClick={this.handleAdd}></input>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
)