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
                '/clientJS/public',
                '/clientJS/src',
                '/clientJS/eslintrc.json',
                '/clientJS/esdoc.json',
                '/clientJS/package.json',
                '/clientJS/README.md',
            ],
            destination: [
                '/clientJS/public',
                '/clientJS/src',
                '/clientJS/.eslintrc.json',
                '/clientJS/.esdoc.json',
                '/clientJS/package.json',
                '/clientJS/README.md',
            ],
        },
        clientTS: {
            //
        },
        simpleContracts: {
            source: [
                '/ethereum/contracts',
                '/ethereum/migrations',
                '/ethereum/test',
                '/ethereum/eslintrc.json',
                '/ethereum/package.json',
                '/ethereum/README.md',
                '/ethereum/solcover.js',
                '/ethereum/soliumignore',
                '/ethereum/soliumrc.json',
                '/ethereum/truffle-config.js',
            ],
            destination: [
                '/ethereum/contracts',
                '/ethereum/migrations',
                '/ethereum/test',
                '/ethereum/.eslintrc.json',
                '/ethereum/package.json',
                '/ethereum/README.md',
                '/ethereum/.solcover.js',
                '/ethereum/.soliumignore',
                '/ethereum/.soliumrc.json',
                '/ethereum/truffle-config.js',
            ],
        },
        upgradableContracts: {
            //
        },
        common: {
            source: [
                '/gitignore',
                '/gitattributes',
                '/editorconfig',
            ],
            destination: [
                '/.gitignore',
                '/.gitattributes',
                '/.editorconfig',
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