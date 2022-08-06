import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

let address;

const fetchingAddress = async () => {
   address = process.env.FACTORY_ADDRESS;
}
fetchingAddress();

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),address);

export default instance;