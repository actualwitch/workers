import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
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
`;

const Sidebar = styled.nav``;

function App() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [delay, setDelay] = useState(1);
    const longRunningAction = () => {
        doThings(delay);
    };
    return (
        <Page>
            <nav>
                <IndicatorSW />
                <Loading />
            </nav>
            <div>
                <form
                    action="/upload"
                    method="post"
                    encType="multipart/form-data"
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
                            setDelay(Number(e.currentTarget.value) || 1)
                        }
                    />
                    <button onClick={longRunningAction}>holup</button>
                </div>
            </div>
            <Global styles={globalStyle} />
        </Page>
    );
}

export default App;
