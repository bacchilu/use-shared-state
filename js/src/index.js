import React from 'react';
import ReactDOM from 'react-dom';

import {useSharedState} from './shared_state';

const Button1 = function () {
    const [sharedState, setSharedState] = useSharedState('key');

    const onClick = function () {
        setSharedState(sharedState + 1);
    };

    return (
        <button type="button" className="btn btn-primary btn-lg" style={{margin: '10px'}} onClick={onClick}>
            {sharedState} +
        </button>
    );
};

const Button2 = function () {
    const [sharedState, setSharedState] = useSharedState('key');

    const onClick = function () {
        setSharedState(sharedState - 1);
    };

    return (
        <button type="button" className="btn btn-secondary btn-lg" style={{margin: '10px'}} onClick={onClick}>
            {sharedState} -
        </button>
    );
};

const App = function (props) {
    const [sharedState, setSharedState] = useSharedState('key');
    React.useEffect(function () {
        setSharedState(0);
    }, []);

    return (
        <React.Fragment>
            <p>
                Hello! We are two different <em>React Components</em> sharing the same state and mutating it.
            </p>
            <p>
                <Button1 />
                <Button2 />
            </p>
        </React.Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
