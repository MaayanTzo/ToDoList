class Box extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var keyNames=[];
        for (var j=0; j<1000; j++){
            keyNames.push(j);
        }
        var boxes=[];
        for (let i=0; i<this.props.howMany; i++){
            boxes.push(<div key={""+keyNames[i]+""} className="box"  style={{height: ""+this.props.height+"px", width: ""+this.props.width+"px"}}></div>)
        }
        return(
            <div>
                <div>
                    {boxes}
                </div>
            </div>
        )
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.changeBoxSize = this.changeBoxSize.bind(this);
        this.state={
            count: 0,
            height: 300,
            width: 300
        }
    }
    changeBoxSize(){
        this.setState({
            count: this.state.count + 1,
        })
    }
    componentDidUpdate(prevProps,prevState){
        if (prevState.count%15==0) {
            this.setState({
                count: this.state.count + 1,
                height: this.state.height*0.75,
                width: this.state.width*0.75
            })
        }
    }
    render(){
        return(
            <div>
                <button onClick = {this.changeBoxSize}>add Box</button>
                <Box height={this.state.height} width={this.state.width} howMany = {this.state.count}></Box>
            </div>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
)