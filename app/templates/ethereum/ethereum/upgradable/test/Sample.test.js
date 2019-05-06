const { TestHelper } = require('zos');
const { Contracts, ZWeb3 } = require('zos-lib');

ZWeb3.initialize(web3.currentProvider);

const Sample = Contracts.getFromLocal('Sample');
const ERC20 = Contracts.getFromNodeModules('openzeppelin-eth', 'ERC20');

require('chai').should();

contract('Sample', function () {

    beforeEach(async function () {
        this.project = await TestHelper();
    })

    it('should create a proxy', async function () {
        const proxy = await this.project.createProxy(Sample);
        const result = await proxy.methods.greet().call();
        result.should.eq('A sample');
    })

    it('should create a proxy for the EVM package', async function () {
        const proxy = await this.project.createProxy(ERC20, { contractName: 'StandaloneERC20', packageName: 'openzeppelin-eth' });
        const result = await proxy.methods.totalSupply().call();
        result.should.eq('0');
    })
})