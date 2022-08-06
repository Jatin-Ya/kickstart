import { Menu,Icon } from "semantic-ui-react";
import { useRouter } from "next/router";

const MainNavBar = () => {
    const router = useRouter();

    const homePageClickHandler=(event) =>{
        event.preventDefault();
        router.push('/');
    }

    const addCampaignClickHandler=(event) =>{
        event.preventDefault();
        router.push('/campaigns/new');
    } 

    return (
        <Menu>
            <Menu.Item onClick={homePageClickHandler}>
                CrowdCoin
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item onClick={addCampaignClickHandler}>
                <Icon name="add"></Icon>
                    Campaign                    
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default MainNavBar;