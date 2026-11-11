// Funções puras, independentes do navegador, para calendário e validação.
export function validEvent(event) {
  if (!event || typeof event.title !== 'string' || !event.title.trim() || typeof event.location !== 'string' || !event.location.trim()) return false;
  const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;
  return iso.test(event.start) && iso.test(event.end) && Number.isFinite(Date.parse(event.start)) && Date.parse(event.end) > Date.parse(event.start);
}
const stamp = date => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeICS = value => String(value ?? '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
function fold(line) {
  let output = '', size = 0;
  for (const char of line) {
    const bytes = new TextEncoder().encode(char).length;
    if (size + bytes > 75) { output += '\r\n '; size = 1; }
    output += char; size += bytes;
  }
  return output;
}
export function calendarICS(event, now = new Date()) {
  if (!validEvent(event)) throw new Error('Data, horário com fuso e local confirmados são necessários.');
  const uid = `sinto-sua-falta-${stamp(event.start)}@sinto-sua-falta`;
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sinto sua falta//Lancamento//PT-BR','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${uid}`,`DTSTAMP:${stamp(now)}`,`DTSTART:${stamp(event.start)}`,`DTEND:${stamp(event.end)}`,`SUMMARY:${escapeICS(event.title)}`,`DESCRIPTION:${escapeICS(event.description)}`,`LOCATION:${escapeICS(event.location)}`,'END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
}
export function googleCalendarURL(event) {
  if (!validEvent(event)) throw new Error('Evento incompleto.');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.search = new URLSearchParams({ action:'TEMPLATE', text:event.title, dates:`${stamp(event.start)}/${stamp(event.end)}`, details:event.description ?? '', location:event.location }).toString();
  return url.href;
}
export function validOptions(options) {
  return Array.isArray(options) && options.length >= 2 && options.length <= 10 && options.every(o=>o && typeof o==='object') && new Set(options.map(o=>o.id)).size === options.length && options.every(o=>o && typeof o.id==='string' && /^[a-z0-9-]{1,64}$/.test(o.id) && typeof o.name==='string' && o.name.trim() && typeof o.description==='string' && o.description.trim() && typeof o.image==='string' && /^\.\/assets\//.test(o.image) && typeof o.alt==='string' && o.alt.trim());
}
export function validVote(vote, options) { return typeof vote==='string' && options.some(option=>option.id===vote); }
