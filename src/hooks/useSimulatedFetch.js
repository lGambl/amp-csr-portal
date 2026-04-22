import { useState, useEffect } from "react";

export function useSimulatedFetch(value, delay = 400) {
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {
        let cancelled = false;
        const t = setTimeout(() => {
            if (!cancelled) setState({ data: value, loading: false });
        }, delay);
        return () => { cancelled = true; clearTimeout(t); };
    }, [value, delay]);

    return state;
}
