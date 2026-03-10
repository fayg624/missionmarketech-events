import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head><title>Event Not Found · Mission MarkeTech</title></Head>
      <div style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: 'var(--ink)' }}>
          Event Not Found
        </h1>
        <p style={{ color: 'var(--accent)', fontSize: '16px' }}>
          This event link may have been removed or the URL is incorrect.
        </p>
        <Link href="/" style={{
          marginTop: '8px',
          background: 'var(--ink)',
          color: 'var(--ivory)',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
        }}>
          ← Back to Dashboard
        </Link>
      </div>
    </>
  )
}
