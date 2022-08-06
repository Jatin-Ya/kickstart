import MainNavBar from "../content/MainNavBar";
import { Container } from "semantic-ui-react";


const Layout = (props) => {
    return (
        <Container>
            <MainNavBar></MainNavBar>
            {props.children}
        </Container>
    )
}

export default Layout;