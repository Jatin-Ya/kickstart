import { useState } from "react";
import { Form, Input, Label, Message, Button, Modal, Loader } from "semantic-ui-react";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const ContributeForm = (props) => {
    const [input, setInput] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        // console.log(event.target.value);
    }
    const submitHandler = async(event) => {
        event.preventDefault();
        setLoading(true);
        setErrMsg('');

        try {
            // window.ethereum.request({method : "eth_requestAccounts"})
            const account = await new web3.eth.getAccounts();
            const instance = await campaign(props.address);
            
            await instance.methods.contribute().send({
                from: account[0],
                value: input
            })
        }
        catch (err) {
            setErrMsg(err.message);
        }
        
        setLoading(false);
    }
    console.log(errMsg);
    return (
        <>
        <Modal
                open={loading}
            >
                <Loader>Loading</Loader>
            </Modal>
        <Form onSubmit={submitHandler}>
            <Form.Field inline>
                <Label>Amount</Label>
                <Input placeholder="in WEI" value={input} onChange={inputChangeHandler}></Input>
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

export default ContributeForm;