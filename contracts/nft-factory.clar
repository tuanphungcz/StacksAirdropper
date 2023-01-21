;; using the SIP009 interface (testnet)
;; trait configured and deployed from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait)

;; declaring NFT named BTC-STACKER -- NFTs for valid Bitcoin users
(define-non-fungible-token BTC-STACKER uint)

;; store the last issued token ID
(define-data-var last-id uint u0)


;; TO-DO as of Jan 20, 2023
;; - [x] Create MVP convert function that takes a Hash160
;;       input and returns Stacks principal || DONE
;; - [x] We want to mint to a specific user: the valid Stacks
;;       address associated with a particular Bitcoin private
;;       key-Hash160 public key hash pair || DONE
;; - [ ] Ensure BTC private key can be input into a Stacks/XVerse wallet
;; - [ ] Enforcing or asserting some version-byte stuff...?
;; - [ ] Limit quantity of BTC-STACKER per Stacks principal to 1
;; - [ ] Perform data checks on claim function, etc.
;; - [ ] Create NFT collection

;; mint a new NFT
;; 0x needed to append
;; Take user input of a Bitcoin public key Hash160, construct
;; Stacks devnet address, call mint function. Example:
;; 2da9514551d0ddd1447260d5119893a18cf7b089 -> add 0x
(define-public (claim (btc-public-key-hash (buff 20)))
  (begin
    (mint
      (unwrap-panic (principal-construct? 0x1a btc-public-key-hash))))
)

;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
     (asserts! (is-eq tx-sender sender) (err u403))
     (nft-transfer? BTC-STACKER token-id sender recipient)))

(define-public (transfer-memo (token-id uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin 
    (try! (transfer token-id sender recipient))
    (print memo)
    (ok true)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? BTC-STACKER token-id)))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id)))

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (token-id uint))
  (ok (some "https://token.stacks.co/{id}.json")))

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
    (let ((next-id (+ u1 (var-get last-id))))
      (var-set last-id next-id)
      (nft-mint? BTC-STACKER next-id new-owner)))