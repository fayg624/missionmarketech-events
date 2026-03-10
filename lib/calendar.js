// Format date for Google Calendar: YYYYMMDDTHHmmSS
export function formatGoogleDate(dateStr, timeStr) {
  const dt = new Date(`${dateStr}T${timeStr}:00`)
  return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

// Format date for Outlook/Yahoo (ISO)
export function formatISODate(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}:00`).toISOString()
}

export function buildGoogleCalUrl(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description || '',
    location: event.meet_link || '',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildOutlookUrl(event) {
  const start = formatISODate(event.date, event.start_time)
  const end = formatISODate(event.date, event.end_time)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: start,
    enddt: end,
    body: event.description || '',
    location: event.meet_link || '',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function buildYahooUrl(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const params = new URLSearchParams({
    v: '60',
    title: event.title,
    st: start,
    et: end,
    desc: event.description || '',
    in_loc: event.meet_link || '',
  })
  return `https://calendar.yahoo.com/?${params.toString()}`
}

export function buildICSContent(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${event.meet_link || ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function formatDisplayDate(dateStr, startTime, endTime) {
  const date = new Date(`${dateStr}T${startTime}:00`)
  const endDate = new Date(`${dateStr}T${endTime}:00`)

  const dateFormatted = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const startFormatted = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const endFormatted = endDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })

  return `${dateFormatted} · ${startFormatted} – ${endFormatted}`
}
