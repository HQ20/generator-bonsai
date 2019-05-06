const fs = require('fs');
const path = require('path');
const slang = require('slang');

/**
 * Generate an ethereum project according to the requirements
 * in 'answers'.
 * @param generator the yeoman generator object
 * @param answers asnwers from input
 */
exports.writingCommandEthereum = (generator, answers) => {
    // prepare source and destinations paths
    const templateFolder = path.join(generator.sourceRoot(), 'ethereum');
    const dashedName = slang.dasherize(answers.name);
    const destinationFolderRoot = path.join(generator.destinationRoot(), dashedName);
    // if the folder already exists, the exit
    if (fs.existsSync(destinationFolderRoot)) {
        generator.log('This folder already exists!');
        return;
    }
    // if not,create it
    fs.mkdirSync(destinationFolderRoot);
    // list folders and files
    const foldersPath = {
        clientJS: {
            source: [
                '/client/js/public',
                '/client/js/src',
                '/client/js/eslintrc.json',
                '/client/js/esdoc.json',
                '/client/js/package.json',
                '/client/js/README.md',
            ],
            destination: [
                '/client/public',
                '/client/src',
                '/client/.eslintrc.json',
                '/client/.esdoc.json',
                '/client/package.json',
                '/client/README.md',
            ],
        },
        clientTS: {
            //
        },
        simpleContracts: {
            source: [
                '/ethereum/simple/contracts',
                '/ethereum/simple/migrations',
                '/ethereum/simple/test',
                '/ethereum/simple/package.json',
            ],
            destination: [
                '/ethereum/contracts',
                '/ethereum/migrations',
                '/ethereum/test',
                '/ethereum/package.json',
            ],
        },
        upgradableContracts: {
            source: [
                '/ethereum/upgradable/contracts',
                '/ethereum/upgradable/migrations',
                '/ethereum/upgradable/test',
                '/ethereum/upgradable/package.json',
                '/ethereum/upgradable/watcher.js',
            ],
            destination: [
                '/ethereum/contracts',
                '/ethereum/migrations',
                '/ethereum/test',
                '/ethereum/package.json',
                '/ethereum/watcher.js',
            ],
        },
        common: {
            source: [
                '/editorconfig',
                '/ethereum/eslintrc.json',
                '/gitattributes',
                '/gitignore',
                '/ethereum/README.md',
                '/ethereum/solcover.js',
                '/ethereum/soliumignore',
                '/ethereum/soliumrc.json',
                '/ethereum/truffle-config.js',
            ],
            destination: [
                '/.editorconfig',
                '/ethereum/.eslintrc.json',
                '/.gitattributes',
                '/.gitignore',
                '/ethereum/README.md',
                '/ethereum/.solcover.js',
                '/ethereum/.soliumignore',
                '/ethereum/.soliumrc.json',
                '/ethereum/truffle-config.js',
            ],
        },
    }
    // copy frontend if necessary
    if (answers['needsFrontend'] === true) {
        for (let x = 0; x < foldersPath.clientJS.source.length; x += 1) {
            generator.fs.copy(
                path.join(templateFolder, foldersPath.clientJS.source[x]),
                path.join(destinationFolderRoot, foldersPath.clientJS.destination[x]),
            );
        }
    }
    // copy either upgradabale contracts or not
    if (answers['needsUpgradable'] === true) {
        //
    } else {
        for (let x = 0; x < foldersPath.simpleContracts.source.length; x += 1) {
            generator.fs.copy(
                path.join(templateFolder, foldersPath.simpleContracts.source[x]),
                path.join(destinationFolderRoot, foldersPath.simpleContracts.destination[x]),
            );
        }
    }
    // copy common files
    for (let x = 0; x < foldersPath.common.source.length; x += 1) {
        generator.fs.copy(
            path.join(templateFolder, foldersPath.common.source[x]),
            path.join(destinationFolderRoot, foldersPath.common.destination[x]),
        );
    }
}