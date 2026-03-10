export function formatGoogleDate(dateStr, timeStr) {
  const cleanTime = timeStr.substring(0, 5)
  const [year, month, day] = dateStr.split('-')
  const [hour, minute] = cleanTime.split(':')
  return `${year}${month}${day}T${hour}${minute}00`
}

export function formatISODate(dateStr, timeStr) {
  const cleanTime = timeStr.substring(0, 5)
  return `${dateStr}T${cleanTime}:00`
}

export function buildGoogleCalUrl(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: event.title,
    dates: `${start}/${end}`,
    details: event.description || '',
    location: event.meet_link || '',
    ctz: event.timezone || 'America/New_York',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildOutlookUrl(event) {
  const start = formatISODate(event.date, event.start_time)
  const end = formatISODate(event.date, event.end_time)
  const params = new URLSearchParams({
    path: '/calendar/action/compose', rru: 'addevent',
    subject: event.title, startdt: start, enddt: end,
    body: event.description || '', location: event.meet_link || '',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function buildYahooUrl(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const params = new URLSearchParams({
    v: '60', title: event.title, st: start, et: end,
    desc: event.description || '', in_loc: event.meet_link || '',
  })
  return `https://calendar.yahoo.com/?${params.toString()}`
}

export function buildICSContent(event) {
  const start = formatGoogleDate(event.date, event.start_time)
  const end = formatGoogleDate(event.date, event.end_time)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const tz = event.timezone || 'America/New_York'
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE', `TZID:${tz}`, 'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `DTSTART;TZID=${tz}:${start}`, `DTEND;TZID=${tz}:${end}`,
    `DTSTAMP:${now}`, `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${event.meet_link || ''}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}

export function formatDisplayDate(dateStr, startTime, endTime, timezone) {
  const cleanStart = startTime.substring(0, 5)
  const cleanEnd = endTime.substring(0, 5)
  const date = new Date(`${dateStr}T${cleanStart}:00`)
  const endDate = new Date(`${dateStr}T${cleanEnd}:00`)
  const tz = timezone || 'America/New_York'
  const dateFormatted = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: tz })
  const startFormatted = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz })
  const endFormatted = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz, timeZoneName: 'short' })
  return `${dateFormatted} · ${startFormatted} – ${endFormatted}`
}

export const TIMEZONES = [
  { value: 'America/New_York',    label: 'Eastern (ET)' },
  { value: 'America/Chicago',     label: 'Central (CT)' },
  { value: 'America/Denver',      label: 'Mountain (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific (PT)' },
  { value: 'America/Anchorage',   label: 'Alaska (AKT)' },
  { value: 'Pacific/Honolulu',    label: 'Hawaii (HT)' },
  { value: 'America/Toronto',     label: 'Toronto (ET)' },
  { value: 'America/Vancouver',   label: 'Vancouver (PT)' },
  { value: 'Europe/London',       label: 'London (GMT/BST)' },
  { value: 'Europe/Paris',        label: 'Paris (CET)' },
  { value: 'Europe/Jerusalem',    label: 'Jerusalem (IST)' },
  { value: 'Asia/Tel_Aviv',       label: 'Tel Aviv (IST)' },
  { value: 'Asia/Dubai',          label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata',        label: 'India (IST)' },
  { value: 'Asia/Singapore',      label: 'Singapore (SGT)' },
  { value: 'Australia/Sydney',    label: 'Sydney (AEDT)' },
]
