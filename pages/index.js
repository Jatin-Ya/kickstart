import React, { useState } from "react";
import { useEffect } from "react";
import factory from "../ethereum/factory";
import CampaignsList from "../components/content/CampaignsList";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import 'semantic-ui-css/semantic.min.css'

const index = (props) => {
    const router = useRouter();
    const addCampaignHandler = (event) => {
        event.preventDefault();
        router.push('/campaigns/new');
    }

    return (
        <>
        <h1>Campaigns</h1>
        <Button floated="right" content="New Campaign" icon="add circle" primary onClick={addCampaignHandler}></Button>
        <CampaignsList data={props.campaignsList} />
        
        </>
    )
}

export async function getStaticProps() {
    const campaignsList = await factory.methods.getDeployedCampaigns().call();
    
    return {
        props: {campaignsList},
        revalidate : 1
    }
}

export default index;