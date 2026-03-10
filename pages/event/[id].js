import Head from 'next/head'
import { supabase } from '../../lib/supabase'
import {
  buildGoogleCalUrl,
  buildOutlookUrl,
  buildYahooUrl,
  buildICSContent,
  formatDisplayDate,
} from '../../lib/calendar'

export async function getServerSideProps({ params }) {
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !event) {
    return { notFound: true }
  }

  return { props: { event } }
}

function CalendarButton({ href, onClick, icon, label, color, textColor }) {
  const base = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 20px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    background: color,
    color: textColor || '#fff',
    transition: 'transform 0.1s, filter 0.15s',
    fontFamily: 'DM Sans, sans-serif',
    width: '100%',
    justifyContent: 'center',
  }

  if (onClick) {
    return (
      <button
        style={base}
        onClick={onClick}
        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.92)'}
        onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
      >
        <span style={{ fontSize: '20px' }}>{icon}</span>
        {label}
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={base}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.92)'}
      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
    >
      <span style={{ fontSize: '20px' }}>{icon}</span>
      {label}
    </a>
  )
}

export default function EventPage({ event }) {
  const displayDate = formatDisplayDate(event.date, event.start_time, event.end_time, event.timezone)

  function downloadICS() {
    const content = buildICSContent(event)
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Head>
        <title>{event.title} · Mission MarkeTech</title>
        <meta name="description" content={`Add "${event.title}" to your calendar. ${displayDate}`} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={`${displayDate}${event.meet_link ? ' · Google Meet' : ''}`} />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header */}
        <header style={{
          background: 'var(--ink)',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          height: '64px',
        }}>
          <div>
            <span style={{
              color: 'var(--ivory)',
              fontFamily: 'Playfair Display, serif',
              fontSize: '17px',
              fontWeight: '600',
            }}>
              Mission MarkeTech
            </span>
            <span style={{
              color: 'var(--accent-light)',
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '1px',
            }}>
              Event Invitation
            </span>
          </div>
        </header>

        {/* Main content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
          }}>

            {/* Event Card */}
            <div style={{
              background: 'var(--white)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--ivory-dark)',
            }}>

              {/* Top stripe */}
              <div style={{
                background: 'var(--ink)',
                padding: '32px 36px',
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'var(--ivory)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  marginBottom: '14px',
                }}>
                  You&apos;re invited
                </div>
                <h1 style={{
                  color: 'var(--ivory)',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  lineHeight: '1.25',
                  marginBottom: '16px',
                }}>
                  {event.title}
                </h1>
                <p style={{
                  color: 'var(--accent-light)',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                }}>
                  {displayDate}
                </p>
              </div>

              {/* Details */}
              <div style={{ padding: '28px 36px' }}>

                {event.description && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '8px',
                    }}>
                      About this event
                    </p>
                    <p style={{
                      fontSize: '15px',
                      color: 'var(--ink-soft)',
                      lineHeight: '1.65',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {event.description}
                    </p>
                  </div>
                )}

                {event.meet_link && (
                  <div style={{
                    background: 'var(--ivory)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{ fontSize: '20px' }}>🎥</span>
                    <div>
                      <p style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '2px',
                      }}>
                        Virtual — Google Meet
                      </p>
                      <a
                        href={event.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--ink)',
                          fontSize: '14px',
                          fontWeight: '500',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                        }}
                      >
                        {event.meet_link}
                      </a>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div style={{
                  borderTop: '1px solid var(--ivory-mid)',
                  marginBottom: '20px',
                  paddingTop: '20px',
                }}>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '14px',
                    textAlign: 'center',
                  }}>
                    Add to your calendar
                  </p>
                </div>

                {/* Calendar Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <CalendarButton
                    href={buildGoogleCalUrl(event)}
                    icon="📅"
                    label="Google Calendar"
                    color="#1C1917"
                  />
                  <CalendarButton
                    href={buildOutlookUrl(event)}
                    icon="📆"
                    label="Outlook Calendar"
                    color="#0078D4"
                  />
                  <CalendarButton
                    onClick={downloadICS}
                    icon="🍎"
                    label="Apple Calendar (.ics)"
                    color="#555555"
                  />
                  <CalendarButton
                    href={buildYahooUrl(event)}
                    icon="📋"
                    label="Yahoo Calendar"
                    color="#720E9E"
                  />
                </div>
              </div>
            </div>

            {/* Footer credit */}
            <p style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '12px',
              color: 'var(--accent-light)',
            }}>
              Powered by{' '}
              <a
                href="https://missionmarke.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                Mission MarkeTech
              </a>
            </p>
          </div>
        </main>
      </div>
    </>
  )
}
