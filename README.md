# hmt-worker
A cloudflare worker that calls the hasEscrow() function of the hmt-escrow contract, and redirects to the hmt dashboard if the condition is false

## To run

1. You'll need a Cloudflare account set up with workers enabled to get going. See Cloudflare's [docs](https://developers.cloudflare.com/workers/) to get started.

2. Clone or fork this repo!

3. `cp wrangler-template.toml wrangler.toml`
   
   and replace the relevant environment variables you'd like to use. The import variables you'll want to pay attention to are

```
account_id: from your Cloudflare workers account

name: what you'd like your worker to be called


```

4. Create a .env file in the root folder, and fill the following with your JSON RPC provider url

```

API_URL = ""

```

5. Deploy your worker

```
wrangler publish

```

## To run tests

```
npx test

```



