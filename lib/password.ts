// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt')

export default function saltAndHashPassword(unHashedPass: string) {
    return bcrypt.hash(unHashedPass, 10).then(function (hash: string) {
        return hash
    })
}
