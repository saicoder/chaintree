import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { ChainTree } from '../target/types/chain_tree'
import { PublicKey } from '@solana/web3.js'
import { expect } from 'chai'

describe('ChainTreeProgram', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.ChainTree as Program<ChainTree>

  const getPdaForUsername = (username: string) => {
    const [pda] = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(username)],
      program.programId
    )

    return pda
  }

  const randomUsername = () => {
    const chars = Array.from(Array(10)).map(() => 97 + Math.floor(Math.random() * 26))
    return String.fromCharCode(...chars)
  }

  const username1 = randomUsername()
  const exampleHash = [...Buffer.alloc(32, 1)]

  it('Should create profile!', async () => {
    const pda = await getPdaForUsername(username1)

    await program.methods
      .initialize(username1, 'http://google.com/', exampleHash)
      .accounts({
        authority: provider.wallet.publicKey,
        profile: pda,
      })
      .rpc()

    const { metadataUrl } = await program.account.profile.fetch(pda)
    expect(metadataUrl).to.equal('http://google.com/')
  })

  it('Should fail when username exists', async () => {
    const pda = await getPdaForUsername(username1)

    const error = await program.methods
      .initialize(username1, 'http://google.com/', exampleHash)
      .accounts({
        authority: provider.wallet.publicKey,
        profile: pda,
      })
      .rpc()
      .catch((ex) => ex)

    expect(JSON.stringify(error)).to.contain('already in use')
  })

  it('Should fail with invalid username', async () => {
    const createProfile = async (username) => {
      const pda = await getPdaForUsername(username)

      return await program.methods
        .initialize(username, 'http://google.com/', exampleHash)
        .accounts({
          authority: provider.wallet.publicKey,
          profile: pda,
        })
        .rpc()
        .catch((ex) => ex)
    }

    const invalidFormatError = await createProfile('asjd*asdb')
    expect(invalidFormatError.message).to.contain('UsernameInvalidFormat')

    const toSmallError = await createProfile('he')
    expect(toSmallError.message).to.contain('UsernameTooSmall')

    const toLargeError = await createProfile('jadjagsdjgajsdgjqiowjdoaaaaaaawe')
    expect(toLargeError.message).to.contain('UsernameTooLarge')
  })

  it('Should not update others profile', async () => {
    const pda = await getPdaForUsername(username1)
    const wallet = anchor.web3.Keypair.generate()
    await provider.connection.requestAirdrop(wallet.publicKey, 1000000000)

    const error = await program.methods
      .updateProfile('http://test.com/', exampleHash)
      .accounts({ profile: pda, authority: wallet.publicKey })
      .signers([wallet])
      .rpc()
      .catch((ex) => ex)

    expect(error.message).to.contain('ConstraintRaw')
  })

  it('Should update his profile', async () => {
    const pda = await getPdaForUsername(username1)

    await program.methods
      .updateProfile('http://newurl.com/', exampleHash)
      .accounts({ profile: pda })
      .rpc()

    const { metadataUrl, metadataHash } = await program.account.profile.fetch(pda)
    expect(metadataUrl).to.equal('http://newurl.com/')
  })
})
