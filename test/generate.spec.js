const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

/**
 * Some basic tests to bonsai
 */
describe('bonsai:app', () => {
    // test the generator by generating only simple contracts, not upgradable using zeppelinos
    // and not using a prepared frontend
    it('generates a simple ethereum project w/ frontend', () => helpers.run(path.join(__dirname, '../app'))
        // answer the questions
        .withPrompts({
            name: 'proj-test',
            blockchain: 'ext-command-ethereum',
            needsFrontend: false,
            needsUpgradable: false,
        })
        .then(() => {
            // assert that the expected files exist, nothing else
            assert.file([
                'proj-test/ethereum/contracts/SimpleStorage.sol',
                'proj-test/ethereum/migrations/1_initial_migration.js',
                'proj-test/ethereum/test/simplestorage.js',
            ]);
            assert.noFile('watcher.js');
            assert.noFile('proj-test/client/');
        }));

    // test the generator by generating contracts that are migratable, using zeppelinos
    // and not using a prepared frontend
    it('generates a upgradable ethereum project w/ frontend', () => helpers.run(path.join(__dirname, '../app'))
        // answer the questions
        .withPrompts({
            name: 'proj-test',
            blockchain: 'ext-command-ethereum',
            needsFrontend: false,
            needsUpgradable: true,
        })
        .then(() => {
            // assert that the expected files exist, nothing else
            assert.file([
                'proj-test/ethereum/contracts/Wallet.sol',
                'proj-test/ethereum/migrations/.gitkeep',
                'proj-test/ethereum/test/Sample.test.js',
                'proj-test/ethereum/watcher.js',
            ]);
            assert.noFile('proj-test/client/');
        }));
});
