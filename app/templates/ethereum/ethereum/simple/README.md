# ethereum
This is the code to run in ethereum.

## Installation

### Requirements
* ganache app (most recent, please)
* browser which supports metamask

## Usage

For those who are not familiar with ethereum development and will not be working with it follow the steps bellow (for ethereum developers, see development):

If it's you first time
1. download [ganache ui app](https://truffleframework.com/ganache)
2. run the *ganache ui app*
3. look at *rpc server* in the app, should say "http://localhost:9545". Otherwise go to options and change the port and click "save and restart"
4. `npm run dev` on this folder (will migrate the contracts)
5. install metamask extesion for your browser (one that supports metamask), and configure it
6. add a new network to metamask (the one from ganache app "http://localhost:9545")
7. reload browser

If it's not your first time, execute only steps 2,4,7

## Development
If you will be developing *ethereum* related code, have a look at the [solidity documentation](https://solidity.readthedocs.io/en/v0.5.2/).
