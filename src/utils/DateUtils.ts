import moment from 'moment-timezone'

export const format = (seconds: number, timezone: string = 'Europe/Madrid') => {
    return moment(seconds * 1000)
        .tz(timezone)
        .toDate()
        .toLocaleString()
}
