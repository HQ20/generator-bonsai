var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('bonsai:app', () => {
    it('generates a simple ethereum project w/ frontend', () => {
        // generate the project
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                name: 'proj-test',
                blockchain: 'ext-command-ethereum',
                needsFrontend: false,
                needsUpgradable: false
            })
            .then(() => {
                // assert something about the generator
                assert.file([
                    'proj-test/ethereum/contracts/SimpleStorage.sol',
                    'proj-test/ethereum/migrations/1_initial_migration.js',
                    'proj-test/ethereum/test/simplestorage.js',
                ]);
                assert.noFile('watcher.js');
            });
    });

    it('generates a upgradable ethereum project w/ frontend', () => {
        // generate the project
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                name: 'proj-test',
                blockchain: 'ext-command-ethereum',
                needsFrontend: false,
                needsUpgradable: true
            })
            .then(() => {
                // assert something about the generator
                assert.file([
                    'proj-test/ethereum/contracts/Wallet.sol',
                    'proj-test/ethereum/migrations/.gitkeep',
                    'proj-test/ethereum/test/Sample.test.js',
                    'proj-test/ethereum/watcher.js',
                ]);
            });
    });
});