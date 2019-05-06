const path = require('path');
const util = require('util');
const childProcess = require('child_process');

var watch = require('node-watch');
var network = 'development';
const { promisify } = util;
const exec = promisify(childProcess.exec);

watch(patch.join(process.cwd(), 'contracts'), { recursive: true }, async function (evt, name) {
    console.log('%s changed.', name);
    const cwd = path.resolve(name, '../..');
    // push new code into local blockchain
    result = await exec(`npx zos push --network ${network}`, { cwd });
    console.log(result);

    var extension = path.extname(name);
    var contractName = path.basename(name, extension);
    // update proxy contract
    result = await exec(`npx zos update ${contractName} --network ${network}`, { cwd });
    console.log(result);
});