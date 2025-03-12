import React from "react";

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState (
            (prevState) => ({ count: prevState.count + 1 }), () => {
                console.log("Состояние обновлено! Текущее значение: ", this.state.count);
            }
        )
    }
    
    render() {
        return (
            <div>
                <p>Счетчик: {this.state.count}</p>;
                <button onClick={this.handleClick}>Увеличить счетчик</button>;
            </div>
        );
    }
}

export default Counter;
