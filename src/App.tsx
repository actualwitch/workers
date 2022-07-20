import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IndicatorSW } from "./components/Indicators";
import { Loading } from "./components/Loading";
import { globalStyle } from "./styles/global";
import { doThings } from "./utils/goThings";

const Page = styled.div`
    display: flex;
    font-size: 1.75em;
    & > nav {
        padding: 4ch;
    }
    & > div {
        padding: 4ch;
        flex: 1;
    }
    textarea {
        border: 0;
        width: 100%;
        min-height: 50vh;
    }
`;

let id = 0;
const bc = new BroadcastChannel("main");
bc.addEventListener("message", ({ data }) => console.log(data));

function App() {
    // const [files, setFiles] = useState<FileList | null>(null);
    const [delay, setDelay] = useState(1);
    const [log, setLog] = useState("");
    const appendLog = useCallback(
        (entry: string) => {
            setLog((log) => `${log}${log ? "\n" : ""}${entry}`);
        },
        [setLog]
    );
    const worker = useMemo(() => {
        return new Worker(new URL("./worker.ts", import.meta.url));
    }, []);
    useEffect(() => {
        const listener = (e: MessageEvent) =>
            appendLog(`Worker sent: "${e.data.result}"`);
        worker.addEventListener("message", listener);
    }, [worker, appendLog]);
    const longRunningAction = () => {
        // const result = doThings(delay);
        // appendLog(`Main thread: ${result}`)
        worker.postMessage({ id: id++, name: "doThings", params: [delay] });
    };
    return (
        <Page>
            <nav>
                <IndicatorSW />
                <Loading />
            </nav>
            <div>
                <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;

                        try {
                            const formData = new FormData(form);
                            const response = await fetch("/upload", {
                                method: "POST",
                                body: formData,
                            });

                            console.log(response);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    <input type="file" accept="image/*" name="image" />
                    <button>send</button>
                </form>
                <div>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        value={delay}
                        onChange={(e) =>
                            setDelay(Number(e.currentTarget.value))
                        }
                    />
                    <button onClick={longRunningAction}>holup</button>
                </div>
                <section>
                    <textarea disabled value={log} readOnly />
                </section>
            </div>
            <Global styles={globalStyle} />
        </Page>
    );
}

export default App;
