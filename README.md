# useSharedState

Same like useSWR but without the data fetching... :-)

Well, this is a little experiment mainly. _useSharedState_ is a custom hook with an API similar to _useState_.

    const [state, setState] = useSharedState('key');

The _key_ argument work the same way the _key_ argument works in [useSWR](https://swr.vercel.app/).
So, the idea is that I can share the same state between two or more components without using _prop drilling_ or _contexts_.

    const Button1 = function () {
        const [sharedState, setSharedState] = useSharedState('key');

        const onClick = function () {
            setSharedState(sharedState + 1);
        };

        return <button onClick={onClick}>{sharedState} +</button>;
    };

    const Button2 = function () {
        const [sharedState, setSharedState] = useSharedState('key');

        const onClick = function () {
            setSharedState(sharedState - 1);
        };

        return <button onClick={onClick}>{sharedState} -</button>;
    };
