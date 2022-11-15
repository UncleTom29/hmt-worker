/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ethers } from 'ethers'
import { hmtEscrowConfig } from './config'
import checkEscrow from '../src/checkEscrow'
import { extract, setSignatureAndMessage } from './cookies'
import { redirectToHmtEscrow } from './redirects'
import { signatureTooOld } from './utils'

// The handler which acts as an entry point for Cloudflare's worker.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Extract the cookies
  let { signature, digest } = extract(request)
  const requestUrl = new URL(request.url)

  if (
    requestUrl.searchParams.get('signature') &&
    requestUrl.searchParams.get('digest')
  ) {
    signature = requestUrl.searchParams.get('signature')
    digest = requestUrl.searchParams.get('digest')
  }

  const messageToSign = `Signing into ${
    requestUrl.hostname
  }\nTime: ${new Date().toISOString()}`

  if (!signature) {

    return redirectToHmtEscrow(messageToSign, request)
  }

  if (signatureTooOld(digest)) {
    return redirectToHmtEscrow(messageToSign, request)
  }

  const address = ethers.utils.verifyMessage(digest, signature)
  // Check if user should have access
  const hasAccess = await checkEscrow(address)

  if (!hasAccess) {
    return redirectToHmtEscrow(messageToSign, request)
  }

  const response = await fetch(request)
  return setSignatureAndMessage(response, signature, messageToSign)
}