/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { deployed } = require('./deployed');
const NAME = 'ComEthToken';
const SYMBOL = 'CET';
const INITIAL_SUPPLY = ethers.utils.parseEther('8000');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Optionnel car l'account deployer est utilisé par défaut
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // We get the contract to deploy
  const ComEthToken = await hre.ethers.getContractFactory('ComEthToken');
  const comEthToken = await ComEthToken.deploy(NAME, SYMBOL, INITIAL_SUPPLY);

  // Attendre que le contrat soit réellement déployé, cad que la transaction de déploiement
  // soit incluse dans un bloc
  await comEthToken.deployed();

  // Create/update deployed.json and print usefull information on the console.
  await deployed('ComEthToken', hre.network.name, comEthToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
