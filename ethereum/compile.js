const fs= require('fs-extra');
const solc = require('solc');
const path = require('path');

const buildPath= path.resolve(__dirname,'build');
fs.removeSync(buildPath);
// console.log("build removed");

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
// console.log(typeof source)
const output=solc.compile(source,1).contracts;
// console.log(output);

fs.ensureDirSync(buildPath);
for (let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','') + '.json'),
        output[contract]
    );
    // console.log(contract);
}