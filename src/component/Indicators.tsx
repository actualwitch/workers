import { useEffect, useState } from "react";
import { SW_INSTALLED } from "../events";

export const IndicatorSW = () => {
    const [isOn, setIsOn] = useState(false);
    useEffect(() => {
        const controller = navigator.serviceWorker.controller;
        setIsOn(Boolean(controller));
        const listener = ({ data }: MessageEvent<string>) => {
            console.log(data);
            if (data === SW_INSTALLED) setIsOn(true);
        };
        const bc = new BroadcastChannel("main");
        bc.addEventListener("message", listener);

        return () => bc.removeEventListener("message", listener);
    }, []);

    return <div>SW: {isOn ? "🙆‍♀️" : "🙅‍♀️"}</div>;
};
