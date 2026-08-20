import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CloudLightning } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'

export default function NotFound() {
  return (
    <>
      <WeatherBackground theme="storm" />
      <PageWrapper>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <motion.div
            animate={{ rotate: [0, -6, 6, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
          >
            <CloudLightning size={64} className="text-dawn" />
          </motion.div>
          <h1 className="mt-6 text-4xl font-semibold">404</h1>
          <p className="mt-2 max-w-xs opacity-70">
            This forecast doesn't exist. The page you're looking for has drifted off.
          </p>
          <Link
            to="/"
            className="cursor-hover mt-6 rounded-full bg-teal px-6 py-2 text-sm font-medium text-night transition hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </PageWrapper>
    </>
  )
}
