import React from "react"

type IUsePreviousHooks<T> = (value: unknown) => { value: T }

function usePrevious<T>(value: unknown) {
    const ref = React.useRef<unknown>();
    React.useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return { value: ref.current } as { value: T }; //in the end, return the current ref value.
}
export default usePrevious;