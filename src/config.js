export const hmtEscrowConfig = {
  escrows: {
    '0xc88bC422cAAb2ac8812de03176402dbcA09533f4': {
      network: 56,
    },
  },
  pessimistic: true,
}

// Enter RPC providers
export const providers = {
  1: '',
  56: '{$API_URL}',
  100: '',
  10: '',
  // ...
}

// (in seconds) Forces re-authentication after maxSignatureTime
export const maxSignatureTime = 60 * 60 * 24 // 1 day