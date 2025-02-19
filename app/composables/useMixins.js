import * as jose from 'jose'

export function useMixins() {
  const signToken = async (payload) => {
    const secret = new TextEncoder().encode('jnputin')
    const data = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime('2h')
      .sign(secret)
    return data
  }

  return {
    signToken
  }
}
