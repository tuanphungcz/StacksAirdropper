
import { Clarinet, Tx, Chain, Account, Contract, types } from 'https://deno.land/x/clarinet@v1.3.1/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that <...>",
    async fn(chain: Chain, accounts: Map<string, Account>, contracts: Map<string, Contract>) {
        

        const public_key_hash = "0xccb6be86af3e9cdec0739b206fbccaf2b44c3e4a"
        

        let wallet_1 = accounts.get('wallet_1')!;
        let block = chain.mineBlock([

            // Tx.contractCall('nft-factory', 'claim', [types.ascii('0xccb6be86af3e9cdec0739b206fbccaf2b44c3e4a')], wallet_1.address) // pass Clarity buffer of a Bitcoin public key Hash160
            Tx.contractCall('nft-factory', 'claim', [public_key_hash], wallet_1.address) // pass Clarity buffer of a Bitcoin public key Hash160


        ]);
        assertEquals(block.height, 2);

        block = chain.mineBlock([
            /*
             * Add transactions with:
             * Tx.contractCall(...)
            */
        ]);
        assertEquals(block.receipts.length, 0);
        assertEquals(block.height, 3);
    },
});
