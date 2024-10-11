import Blobby from '@/components/svg/blobby'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Index = () => {
	const router = useRouter()
	const { ready, authenticated, logout } = usePrivy()
	const { login } = useLogin({
		onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
			console.log('🔑 ✅ Login success', {
				user,
				isNewUser,
				wasPreviouslyAuthenticated,
			})
			router.push('/farcaster')
		},
		onError(error) {
			console.log('🔑 🚨 Login error', { error })
		},
	})

	return (
		<>
			<Head>
				<title>Privy Farcaster Demo</title>
			</Head>
			<main className="bg-primary min-h-screen">
				<div className='flex h-screen w-screen flex-col items-center justify-center'>
					<Blobby />
					<h2 className='my-4 text-xl font-semibold text-dark'>
						Privy Farcaster Demo
					</h2>
					<h2 className='my-4 text-md text-dark'>
						You can login with and write to Farcaster using Privy.
					</h2>
					<div className='mt-2 w-1/2'>
						<button
							className='my-4 w-full rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-1 hover:text-dark disabled:bg-accent-2 disabled:text-white'
							onClick={login}
							disabled={!ready || authenticated}
						>
							Login
						</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default Index