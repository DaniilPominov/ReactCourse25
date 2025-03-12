import React from 'react';

class FocusInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.inputRef} placeholder="Фокус здесь!" />
            </div>
        );
    }
}

export default FocusInput;
