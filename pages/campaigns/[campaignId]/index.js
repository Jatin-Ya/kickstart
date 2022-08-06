import { useRouter } from "next/router";
import { Card, CardGroup, Container, Item } from "semantic-ui-react";
import ContributeForm from "../../../components/content/ContributeForm";
import campaign  from "../../../ethereum/campaign";
const ViewCampaign = (props)=> {
    

    return (
        <div>
            <Container style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <Item style={{
                    width : "60%"
                }}>
            <CardGroup>
                <Card>
                    <Card.Content>
                        <h4>Minimum Contribution to be an Approver: {props.minimumContribution}</h4>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <h4>Balance : {props.balance}</h4>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <h4>Number of Approvers : {props.approversCount}</h4>
                    </Card.Content>
                </Card>
            </CardGroup>
            </Item>
            <Item style={{
                width : "40%"
            }
            }>
                <ContributeForm address={props.campaignId}></ContributeForm>
            </Item>
            </Container>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {query} = context 
    console.log(query)
    
    // const router = useRouter();

    // const {campaignId}=await router.query;
    // console.log(campaignId);
    
    const campaignInstance = await campaign(context.query.campaignId);

    const campaignDetails = await campaignInstance.methods.getSummary().call();
    return {
        props: {
            minimumContribution: campaignDetails['0'],
            balance: campaignDetails['1'],
            length: campaignDetails['2'],
            approversCount: campaignDetails['3'],
            manager: campaignDetails['4'],
            campaignId: query["campaignId"]
        }
    }
}

export default ViewCampaign;