import { hmtEscrowConfig } from './config'

export const redirectToHmtEscrow = (digest, request) => {
  const redirectBack = new URL(request.url)
  redirectBack.searchParams.append('digest', digest)
  const redirectUrl = new URL('https://app.humanprotocol.org/login')
  hmtEscrowConfig.messageToSign = digest
  redirectUrl.searchParams.append(
    'hmtEscrowConfig',
    JSON.stringify(hmtEscrowConfig),
  )
  redirectUrl.searchParams.append('redirectUri', redirectBack.toString())
  return Response.redirect(redirectUrl.toString(), 302)
}