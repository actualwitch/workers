import styled from "@emotion/styled";
import { IndicatorSW } from "./component/Indicators";
const Page = styled.div``;

const Sidebar = styled.nav`
  font-size: 2em;
`;


function App() {
    return (
        <Page>
            <Sidebar>
                <IndicatorSW />
            </Sidebar>
        </Page>
    );
}

export default App;
