import React from 'react';

const data = {};

export const useSharedState = function (key, fallbackData = undefined) {
    if (data[key] === undefined) data[key] = {data: fallbackData, callbacks: []};
    const privateData = data[key];

    const [currentState, setCurrentState] = React.useState(privateData.data);
    React.useEffect(
        function () {
            const cb = function () {
                setCurrentState(privateData.data);
            };

            privateData.callbacks.push(cb);

            return function () {
                const index = privateData.callbacks.indexOf(cb);
                privateData.callbacks.splice(index, 1);
            };
        },
        [key]
    );

    const mutate = function (value) {
        privateData.data = value;
        privateData.callbacks.forEach(function (cb) {
            cb();
        });
    };

    return [currentState, mutate];
};
