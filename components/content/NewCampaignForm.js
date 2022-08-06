import { useState } from "react";
import { Form, Button, Message, Segment, Dimmer, Image, Loader, Modal } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

const NewCampaignForm = () => {
    const [input, setInput] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        // console.log(event.target.value);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrMsg('');

        try {
            const account = await new web3.eth.getAccounts();
            await factory.methods.createCampaign(Number(input)).send({
                from: account[0]
            })
        }
        catch (err) {
            setErrMsg(err.message);
            setLoading(false);
            return;
        }
        
        setLoading(false);
        router.push('/');

    }

    return (
        <>
            <Modal
                open={loading}
            >
                <Loader>Loading</Loader>
            </Modal>
            {/* <Segment>
                <Dimmer active={loading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment> */}
            <Form onSubmit={formSubmitHandler} error={errMsg}>
                <Form.Field inline>
                    <label >Minimum Contribution Amount</label>
                    <input placeholder="In WEI" value={input} onChange={inputChangeHandler}></input>
                </Form.Field>
                <Message
                    error
                    header='ERROR!!'
                    content={errMsg}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </>

    )
}

export default NewCampaignForm;