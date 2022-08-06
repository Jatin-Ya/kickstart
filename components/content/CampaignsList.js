import Link from "next/link";
import 'semantic-ui-css/semantic.min.css'
import { Card } from "semantic-ui-react";

const CampaignsList = (props) => {
    const items = props.data.map((element)=>({
        header: element,
        description: <Link href={'/campaigns/'+element}>View Campaign</Link>,
        fluid : true
    }));

    return (
        <>
        <Card.Group items={items}/>
        </>
    )

    // return (
    //     <ul>
    //     {props.data.map((element)=>(<li>{element}</li>))}
    //     </ul>
    // )
}

export default CampaignsList;