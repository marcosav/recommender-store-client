export const createValidator = (t: any, errors: any) => {
    const errorFor = (field: string) => field in errors

    const helperFor = (field: string) => {
        const error = errors[field]
        if (error === undefined) return undefined
        const args = error.split('.')

        let msg = t(`validation.${args[0]}`)

        const details = args.slice(1)
        for (let k = 0; k < details.length; k++)
            msg = msg.replace('{' + k + '}', details[k])

        return msg
    }

    return { errorFor, helperFor }
}
