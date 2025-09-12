
import { BrowserProvider } from 'ethers'
export async function getSigner(){
  if (!window.ethereum) throw new Error('No wallet found')
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return signer
}
