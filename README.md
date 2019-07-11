# Bitcoin payment system

## Stack
- Node.js(8)
- Koa.js(async/await)
- Env Import(dotenv)
- Logging(chalk)
- Syntax(eslint)
- Custom build path(jsconfig.json)
- Real time watching(nodemon)

## Installation
    yarn install
   
## Start
    yarn start ( test )
    
    pm2 start src/index.js ( deployment on hosting server )
    pm2 list # Display all processes status
    pm2 stop 0  # Stop specific process id
    pm2 delete 0  # Will remove process from pm2 list
    pm2 restart 0  # Restart specific process id
    Reference link : http://pm2.keymetrics.io/docs/usage/quick-start/

## Flow
  To test APIs
  First create the wallet by using [createNewWallet] api.
  Second check the required bitcoin by using [getServiceBitcoinValue]
  And Call [createPushAndConfirmTransaction] API to  check and push transaction.

-   Request
    GET : https://bitcoin.ctemplar.com/api/v1.0/bitcoin/getBitcoinValue
    Get the latest price for the bitcoin.
 
    Response example:
    {
        "USD":6719.77
    }

-   Request
    POST : https://bitcoin.ctemplar.com/api/v1.0/bitcoin/getServiceBitcoinValue 
    Get the bitcoin required for service.(Fee + Required BTC for Service )
    Required Parameters
    {
        "address": "1CShpFvD7MsiTWxiAjj77dKsHPBU1Aw5NH"
    }
    Response example:
    {
        "required_balance": 0.0186,
        "required_balance_USD": 117
    }
    
-   Request
    POST : https://bitcoin.ctemplar.com/api/v1.0/bitcoin/createNewWallet
    Create new bitcoin wallet
    Required Parameters
    {
        "memory":8,
        "email_count":"3"
    }
    Response example:
    {
        "invoice": "invPvfHny5QnffugyKgwYvUeXjCUgz4ywhxzANDcTHa7amWLKbjnb",
        "address": "1CZgyfDsA5Bob2wVyTbCxSGXwSAEur4LYB", // Wallet address created.
        "redeem_code": "BTCvNqa8knrVkGyYmrfMTRtU77xrnPWiiH8n8accdEm9W1EHsRbCz", //Redeem code is like a Wallet Private Key
    }

 -   Request
    POST : https://bitcoin.ctemplar.com/api/v1.0/bitcoin/checkTransaction
    Creates, pushes and awaits for a transaction confirmation.

    Required Parameters
    {
        "redeem_code":"BTCvxMR4zkFVx4Vv3kmFFriRFZbXZDZmmGVBok1J9VDiMBsg3wc1B",
        "from_address":"1C4JnkA2ZiiEThxubquFxqREuW2iMYQjRZ",
    }
    redeem_code : Redeem code is like a Wallet Private Key
    from_address : Random Wallet Address.

    Response example:
    {
        "address": "15CUKzJ3w6YiHSoJShdVj3TfwVW8NGkdFe",
        "balance": 0,
        "pending_balance": 100000,
        "paid_out": 0,
        "required_balance": 100000,
        "status": "Pending"
    }

    {status:Waiting|Pending|Received|Sent}	
    'Sent' is the success and last status.
 