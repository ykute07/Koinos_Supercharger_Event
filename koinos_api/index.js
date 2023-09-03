import express from 'express'
import {
  Signer,
  Contract,
  Provider,
  utils,
} from "koilib";
const rpcNodes = ["https://harbinger-api.koinos.io"];
const provider = new Provider(rpcNodes);
const signer = Signer.fromSeed("Your Private key");
signer.provider = provider
const koinContract = new Contract({
  id: "1481C175fovRXH6qo1YdJbfVtg3euUsZoV",
  abi: utils.tokenAbi,
  provider,
  signer,
});

// // create contract and deploy
// const contract = new Contract({ signer, provider, bytecode });
// const { transaction1, receipt1 } = await contract.deploy({
//   chainId: "EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==",
//   rcLimit: "100000000",

//  });
// console.log("Transaction submitted. Receipt:");
// console.log(receipt1);
// wait to be mined
// const { blockNumber1 } = await transaction1.wait();
//console.log(`Contract uploaded in block number ${blockNumber1}`);


const app = express();
const PORT = 8080
async function getKit(addrssofmint, nft) {
  



  const map = new Map()
  map.set('art','https://ipfs.io/ipfs/QmQ6pkp4xcdbdabp5XCeJYuQBV5cnQnTf7CVpf34rpHUDN')
  map.set('cityilluminati','https://ipfs.io/ipfs/QmaJRr4onE83XLZAFSpP7o6eGeHWZ8yC43gK3FLFn3UH35')
  map.set('collectiable1','https://ipfs.io/ipfs/QmVNXV98TvYQx5v9WK1EZeBnEfrJyg6RMYCowA7r8ERYeK')
  map.set('collectiables','https://ipfs.io/ipfs/QmY68rpxsJ9X78pwNdBq7rZfPgv6r3P3GeViVioQHnSYze')
  map.set('location','https://ipfs.io/ipfs/Qmcdr22tpwBYQixVoW6BbpVpcXD1sQ31G1q4GbQ5niXZ5K')
  map.set('mcdonald','https://ipfs.io/ipfs/QmPcHjZY7qzye6RVu2FnPK7aHjz6c19s9VJWkcUVKhtF7Q')
  map.set('movietheatre','https://ipfs.io/ipfs/Qmc66EPoV2PnEASXLp5cUYuonq5vhp6CaDPAoHpEKZwfXX')
  map.set('voucher','https://ipfs.io/ipfs/QmRyqZP8QXzV1cymp1XFDkkQzqrJKk4GJM5SJSabyfYxRE')

const koin = koinContract.functions;

console.log(signer.getAddress())
const x = await koin.mint({
  to: addrssofmint,
},{
    chainId: "EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==",
    rcLimit: "100000000",
  
   });
  console.log(x['receipt']['id']);
  const urlofimage = map.get(nft)

  return x['receipt']['id']

}
 app.get('/mintnft/:address/:nft', async (req, res) => {

 const detailofnft= await  getKit(req.params.address,req.params.nft)
  
  res.send(detailofnft)
  })
  
  app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))