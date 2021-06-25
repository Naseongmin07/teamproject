require('dotenv').config()
const crypto = require('crypto')

function createToken(userid){
    let header = {
        'typ':'JWT',
        'alg':'HS256'
    }
    let exp = new Date().getTime() + ((60*60*2)*10000)
    let payload = {
        userid,exp
    }

    const encodingHeader = Buffer.from(JSON.stringify(header))
                                           .toString('base64')
                                           .replace('==','=')
                                           .replace('=','')
                                           .replace('=','')
    const encondingPayload = Buffer.from(JSON.stringify(payload))
                                             .toString('base64')
                                             .replace('==','')
                                             .replace('=','')
                                             .replace('=','')
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                                                       .update(encodingHeader + '.' + encondingPayload)
                                                       .digest('base64')
                                                       .replace('==','=')
                                                       .replace('=','')
                                                       .replace('=','')
    let jwt = `${encodingHeader}.${encondingPayload}.${signature}`              
    return jwt
}

module.exports = createToken