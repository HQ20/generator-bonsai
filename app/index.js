const Generator = require('yeoman-generator');
// import generators
const Ethereum = require('./ethereum');


/**
 * The main generator class
 */
module.exports = class extends Generator {
    /**
     * Ask the user the following questions
     */
    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname,  // Default to current folder name
        }, {
            type: 'list',
            name: 'blockchain',
            message: 'Your blockchain platform',
            choices: [{
                name: 'Ethereum',
                value: 'ext-command-ethereum',
            },
            {
                name: 'Quorum',
                value: 'ext-command-quorum',
            }],
            default: this.blockchainplatform,
        }, {
            when: (response) => {
                return response.blockchain === 'ext-command-ethereum';
            },
            type: 'confirm',
            name: 'needsFrontend',
            message: 'Do you need frontend?',
            default: this.needsfe,
        }, {
            when: (response) => {
                return response.blockchain === 'ext-command-ethereum';
            },
            type: 'confirm',
            name: 'needsUpgradable',
            message: 'Do you need the contracts upgradable?',
            default: this.needsup,
        }]);
    }

    /**
     * Start generating the folder
     */
    writing() {
        const generator = this;
        // depending on the blockchain platform
        if (this.answers.blockchain === 'ext-command-ethereum') {
            Ethereum.writingCommandEthereum(generator, this.answers);
        } else if (this.answers.blockchain === 'ext-command-quorum') {
            this.log('Not yet ready!');
        }
    }
};
