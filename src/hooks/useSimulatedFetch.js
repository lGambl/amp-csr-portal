import { useState, useEffect } from "react";

export function useSimulatedFetch(value, delay = 400) {
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {
        setState((s) => ({ ...s, loading: true }));
        const t = setTimeout(
            () => setState({ data: value, loading: false }),
            delay,
        );
        return () => clearTimeout(t);
    }, [value, delay]);

    return state;
}
