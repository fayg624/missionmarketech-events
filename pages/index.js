import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--ivory)',
  },
  header: {
    background: 'var(--ink)',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: 'var(--ivory)',
    fontFamily: 'Playfair Display, serif',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  logoSub: {
    color: 'var(--accent-light)',
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    display: 'block',
    marginTop: '1px',
  },
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'var(--ink)',
    marginBottom: '8px',
    lineHeight: '1.2',
  },
  pageSubtitle: {
    color: 'var(--accent)',
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '48px',
  },
  section: {
    background: 'var(--white)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: 'var(--shadow)',
    marginBottom: '40px',
    border: '1px solid var(--ivory-dark)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '28px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--ivory-mid)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  formGridFull: {
    gridColumn: '1 / -1',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  input: {
    padding: '12px 14px',
    border: '1.5px solid var(--ivory-dark)',
    borderRadius: '8px',
    fontSize: '15px',
    color: 'var(--ink)',
    background: 'var(--ivory)',
    outline: 'none',
    transition: 'border-color 0.15s',
    width: '100%',
  },
  textarea: {
    padding: '12px 14px',
    border: '1.5px solid var(--ivory-dark)',
    borderRadius: '8px',
    fontSize: '15px',
    color: 'var(--ink)',
    background: 'var(--ivory)',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    width: '100%',
    transition: 'border-color 0.15s',
  },
  timeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  submitBtn: {
    marginTop: '28px',
    background: 'var(--ink)',
    color: 'var(--ivory)',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'background 0.15s, transform 0.1s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  successBanner: {
    background: '#F0FFF4',
    border: '1.5px solid #68D391',
    borderRadius: '10px',
    padding: '16px 20px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  successText: {
    color: '#276749',
    fontSize: '14px',
    fontWeight: '500',
  },
  successLink: {
    background: 'var(--green)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  eventCard: {
    background: 'var(--ivory)',
    border: '1.5px solid var(--ivory-dark)',
    borderRadius: '10px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  eventCardLeft: {
    flex: 1,
    minWidth: '200px',
  },
  eventCardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '4px',
  },
  eventCardMeta: {
    fontSize: '13px',
    color: 'var(--accent)',
  },
  eventCardActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  copyBtn: {
    background: 'var(--ink)',
    color: 'var(--ivory)',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  viewBtn: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '1.5px solid var(--ink)',
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: 'transparent',
    color: 'var(--red)',
    border: '1.5px solid var(--red)',
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--accent)',
    fontSize: '15px',
  },
  errorText: {
    color: 'var(--red)',
    fontSize: '13px',
    marginTop: '8px',
  }
}

export default function Dashboard() {
  const [form, setForm] = useState({
    title: '',
    date: '',
    start_time: '',
    end_time: '',
    description: '',
    meet_link: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdEvent, setCreatedEvent] = useState(null)
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setLoadingEvents(true)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setEvents(data || [])
    setLoadingEvents(false)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.title || !form.date || !form.start_time || !form.end_time) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.start_time >= form.end_time) {
      setError('End time must be after start time.')
      return
    }

    setLoading(true)
    const { data, error: insertError } = await supabase
      .from('events')
      .insert([form])
      .select()
      .single()

   if (insertError) {
      setError(insertError.message || JSON.stringify(insertError))
      console.error(insertError)
    } else {
      setCreatedEvent(data)
      setForm({ title: '', date: '', start_time: '', end_time: '', description: '', meet_link: '' })
      fetchEvents()
    }
    setLoading(false)
  }

  function getEventUrl(id) {
    return `${window.location.origin}/event/${id}`
  }

  async function copyLink(id) {
    await navigator.clipboard.writeText(getEventUrl(id))
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  async function deleteEvent(id) {
    if (!confirm('Delete this event? The shareable link will stop working.')) return
    await supabase.from('events').delete().eq('id', id)
    fetchEvents()
  }

  function formatDate(dateStr, startTime) {
    const d = new Date(`${dateStr}T${startTime}:00`)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <Head>
        <title>Event Links · Mission MarkeTech</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="https://missionmarke.tech/wp-content/uploads/2025/05/ink_horzizontal.png" />
      </Head>

      <div style={styles.page}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>
            Mission MarkeTech
            <span style={styles.logoSub}>Event Link Generator</span>
          </div>
        </header>

        <main style={styles.main}>
          <h1 style={styles.pageTitle}>Create an Event Link</h1>
          <p style={styles.pageSubtitle}>
            Fill in your event details and share a single link — attendees can add it to any calendar.
          </p>

          {/* Create Form */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>New Event</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                {/* Title */}
                <div style={{ ...styles.fieldGroup, ...styles.formGridFull }}>
                  <label style={styles.label}>Event Title *</label>
                  <input
                    style={styles.input}
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Nonprofit AI Strategy Workshop"
                    onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                    onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                  />
                </div>

                {/* Date */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Date *</label>
                  <input
                    style={styles.input}
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                    onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                  />
                </div>

                {/* Times */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Time *</label>
                  <div style={styles.timeRow}>
                    <input
                      style={styles.input}
                      type="time"
                      name="start_time"
                      value={form.start_time}
                      onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                      onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                    />
                    <input
                      style={styles.input}
                      type="time"
                      name="end_time"
                      value={form.end_time}
                      onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                      onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                    />
                  </div>
                </div>

                {/* Meet Link */}
                <div style={{ ...styles.fieldGroup, ...styles.formGridFull }}>
                  <label style={styles.label}>Google Meet Link</label>
                  <input
                    style={styles.input}
                    name="meet_link"
                    value={form.meet_link}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/abc-defg-hij"
                    onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                    onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                  />
                </div>

                {/* Description */}
                <div style={{ ...styles.fieldGroup, ...styles.formGridFull }}>
                  <label style={styles.label}>Description / Agenda</label>
                  <textarea
                    style={styles.textarea}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="What will attendees experience? Add an agenda, speaker notes, or anything helpful."
                    onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                    onBlur={e => e.target.style.borderColor = 'var(--ivory-dark)'}
                  />
                </div>
              </div>

              {error && <p style={styles.errorText}>{error}</p>}

              <button
                type="submit"
                style={styles.submitBtn}
                disabled={loading}
                onMouseEnter={e => e.target.style.background = 'var(--ink-soft)'}
                onMouseLeave={e => e.target.style.background = 'var(--ink)'}
              >
                {loading ? 'Creating...' : '→ Generate Event Link'}
              </button>
            </form>

            {/* Success Banner */}
            {createdEvent && (
              <div style={styles.successBanner}>
                <div>
                  <p style={styles.successText}>
                    ✓ <strong>{createdEvent.title}</strong> — your link is ready to share!
                  </p>
                  <p style={{ ...styles.successText, fontSize: '12px', marginTop: '2px', opacity: 0.8 }}>
                    {getEventUrl(createdEvent.id)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={styles.successLink}
                    onClick={() => copyLink(createdEvent.id)}
                  >
                    {copied === createdEvent.id ? '✓ Copied!' : '⎘ Copy Link'}
                  </button>
                  <a
                    href={`/event/${createdEvent.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button style={{ ...styles.successLink, background: 'var(--ink)' }}>
                      ↗ Preview
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Past Events */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Events</h2>

            {loadingEvents ? (
              <p style={styles.emptyState}>Loading events…</p>
            ) : events.length === 0 ? (
              <p style={styles.emptyState}>No events yet — create one above.</p>
            ) : (
              <div style={styles.eventList}>
                {events.map(ev => (
                  <div key={ev.id} style={styles.eventCard}>
                    <div style={styles.eventCardLeft}>
                      <div style={styles.eventCardTitle}>{ev.title}</div>
                      <div style={styles.eventCardMeta}>
                        {formatDate(ev.date, ev.start_time)} · {ev.start_time} – {ev.end_time}
                        {ev.meet_link && ' · Google Meet'}
                      </div>
                    </div>
                    <div style={styles.eventCardActions}>
                      <button
                        style={{ ...styles.copyBtn, background: copied === ev.id ? 'var(--green)' : 'var(--ink)' }}
                        onClick={() => copyLink(ev.id)}
                      >
                        {copied === ev.id ? '✓ Copied!' : '⎘ Copy Link'}
                      </button>
                      <a href={`/event/${ev.id}`} target="_blank" rel="noopener noreferrer">
                        <button style={styles.viewBtn}>↗ View</button>
                      </a>
                      <button style={styles.deleteBtn} onClick={() => deleteEvent(ev.id)}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
