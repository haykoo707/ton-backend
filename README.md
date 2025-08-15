# TON Wallet Backend with Persistent Disk

## Deploy to Render
1. Բեռնիր այս project-ը GitHub-ում
2. Render-ում ստեղծիր նոր **Web Service**
3. Միացրու Persistent Disk (1GB բավական է)
4. Mount Path դնի `/data`
5. Deploy արա

## API
POST /save-wallet
{
  "username": "Hayk",
  "wallet": "EQCabc1234567890exampleaddress"
}

GET /wallets → վերադարձնում է վերջին 20 wallet-ը
