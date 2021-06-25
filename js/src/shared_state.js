import React from 'react';

const data = {};

export const useSharedState = function (key) {
    if (data[key] === undefined) data[key] = {data: undefined, cb: []};
    const privateData = data[key];

    const [currentState, setCurrentState] = React.useState(privateData.data);
    React.useEffect(
        function () {
            const cb = function (d) {
                setCurrentState(d);
            };

            privateData.cb.push(cb);

            return function () {
                const index = privateData.cb.indexOf(cb);
                privateData.cb.splice(index, 1);
            };
        },
        [key]
    );

    const mutate = function (value) {
        privateData.data = value;
        privateData.cb.forEach(function (cb) {
            cb(value);
        });
    };

    return [currentState, mutate];
};
