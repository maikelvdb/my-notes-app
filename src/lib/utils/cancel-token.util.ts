import axios, { CancelToken, CancelTokenSource } from "axios";

const cancelSources = new Map<string, CancelTokenSource>([]);

function cancelLastRequest(requestId: string): void {
  const token = cancelSources.get(requestId);
  if (token) {
    token.cancel();
  }
}

function getCancelToken(requestId: string): CancelToken {
  cancelLastRequest(requestId);
  const nextCancelSource = axios.CancelToken.source();
  cancelSources.set(requestId, nextCancelSource);
  return nextCancelSource.token;
}

export { getCancelToken, cancelLastRequest };
