import { addDays, getDay, setMonth, setDate, getYear, startOfYear, endOfYear } from 'date-fns'

export interface Holiday {
  date: Date
  name: string
}

// Calculate Easter Monday (Annandag påsk) using Meeus's algorithm
function getEasterMonday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  
  // Easter Sunday
  const easter = new Date(year, month - 1, day)
  // Easter Monday is the day after
  return addDays(easter, 1)
}

// Calculate Good Friday (Långfredagen)
function getGoodFriday(year: number): Date {
  const easterMonday = getEasterMonday(year)
  return addDays(easterMonday, -3)
}

// Calculate Ascension Day (Kristi himmelsfärdsdag) - 39 days after Easter
function getAscensionDay(year: number): Date {
  const easterMonday = getEasterMonday(year)
  return addDays(easterMonday, 38)
}

// Calculate Pentecost (Pingstdagen) - 49 days after Easter
function getPentecost(year: number): Date {
  const easterMonday = getEasterMonday(year)
  return addDays(easterMonday, 48)
}

// Calculate Midsummer Eve (Midsommarafton) - Friday between June 19-25
function getMidsummerEve(year: number): Date {
  let date = new Date(year, 5, 19) // June 19
  while (getDay(date) !== 5) { // Find Friday
    date = addDays(date, 1)
  }
  return date
}

// Calculate Midsummer Day (Midsommardagen) - Saturday after Midsummer Eve
function getMidsummerDay(year: number): Date {
  return addDays(getMidsummerEve(year), 1)
}

// Calculate All Saints' Day (Alla helgons dag) - Saturday between Oct 31 - Nov 6
function getAllSaintsDay(year: number): Date {
  let date = new Date(year, 9, 31) // October 31
  while (getDay(date) !== 6) { // Find Saturday
    date = addDays(date, 1)
  }
  return date
}

export function getSwedishHolidays(year: number): Holiday[] {
  return [
    // Fixed holidays
    { date: new Date(year, 0, 1), name: 'Nyårsdagen' },
    { date: new Date(year, 0, 6), name: 'Trettondedag jul' },
    { date: new Date(year, 4, 1), name: 'Första maj' },
    { date: new Date(year, 5, 6), name: 'Sveriges nationaldag' },
    { date: new Date(year, 11, 24), name: 'Julafton' },
    { date: new Date(year, 11, 25), name: 'Juldagen' },
    { date: new Date(year, 11, 26), name: 'Annandag jul' },
    { date: new Date(year, 11, 31), name: 'Nyårsafton' },
    
    // Moveable holidays
    { date: getGoodFriday(year), name: 'Långfredagen' },
    { date: getEasterMonday(year), name: 'Annandag påsk' },
    { date: getAscensionDay(year), name: 'Kristi himmelsfärdsdag' },
    { date: getPentecost(year), name: 'Pingstdagen' },
    { date: getMidsummerEve(year), name: 'Midsommarafton' },
    { date: getMidsummerDay(year), name: 'Midsommardagen' },
    { date: getAllSaintsDay(year), name: 'Alla helgons dag' },
  ].sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function isSwedishHoliday(date: Date): boolean {
  const year = getYear(date)
  const holidays = getSwedishHolidays(year)
  
  return holidays.some(holiday => {
    return holiday.date.getDate() === date.getDate() &&
           holiday.date.getMonth() === date.getMonth() &&
           holiday.date.getFullYear() === date.getFullYear()
  })
}

export function isWorkday(date: Date): boolean {
  const dayOfWeek = getDay(date)
  // Weekend (Saturday = 6, Sunday = 0)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false
  }
  // Check if it's a holiday
  return !isSwedishHoliday(date)
}