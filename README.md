# StacksAirdropper
Airdrop NFTs to your Bitcoin holding friends! Input the public key hash of a Bitcoin address, create a Stacks address that is associated to that private key, and mint it a Stacks NFT.

## Features

- section to be added

## Running Locally

1. Install dependencies using Yarn:

```sh
yarn
```

2. Start the development server:

```sh
yarn dev
```

## Development notes
- Currently: writing tests in TypeScript, trying to instantiate and pass a buff (20) to our `claim` function

TO-DO as of Jan 20, 2023
- [x] Create MVP convert function that takes a Hash160 input and returns Stacks principal || DONE
- [x] We want to mint to a specific user: the valid Stacks address associated with a particular Bitcoin private key-Hash160 public key hash pair || DONE
- [ ] Write basic tests for core Stacks address construction and NFT minting
- [ ] Ensure BTC private key can be input into a Stacks/XVerse wallet
- [ ] Enforcing or asserting some version-byte stuff on front-end side
- [ ] Limit quantity of BTC-STACKER per Stacks principal to 1
- [ ] Perform data checks on claim function, etc.
- [ ] Create NFT collection

## License

Licensed under the [MIT license](https://github.com/tuanphungcz/StacksAirdropper.vercel.app).
