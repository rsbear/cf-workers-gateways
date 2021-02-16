### The goal here is to make a graphql gateway and deploy it to cloudflare workers. Global distribution is dope and the idea of having a globally distributed data store as a cache is extremely enticing

## get started

1. make a cloudflare account (free)
2. install wrangler cli `npm i @cloudflare/wrangler -g`
3. add account_id to `wrangler.toml`
4. some commands `wrangler dev` or `wrangler preview`
5. cf workers docs - https://developers.cloudflare.com/workers/

# the gateway dir (preferred)

this is the preferred method because it uses tools to potentially merge schemas as necessary

# proxy dir

a different implementation where we hand rolled the introspection process. there's commented out cache code tho which is neat

very much a WIP lol
