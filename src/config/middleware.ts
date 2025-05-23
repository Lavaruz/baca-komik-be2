import { decrypt } from "./crypto"

export function decryptAES(req, res, next){
    req.body = JSON.parse(decrypt(req.body.d))
    
    next()
}