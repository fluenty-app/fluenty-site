import { NewAccessToken } from "../new-access-token";

export function resolveNewAccessToken(token: NewAccessToken) {
  return {
    token: token.plainTextToken,
    createdAt: token.accessToken.createdAt,
    expiresAt: token.accessToken.expiresAt,
  }
}
