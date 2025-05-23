import crypto from "crypto-js"

export function encrypt(data, key=process.env.AES_KEYS){
    if(process.env.SECURE == 'false') return data;
	
	if(typeof data == 'object') data = JSON.stringify(data);
	
	return {r: crypto.AES.encrypt(data, key).toString()};
}

export function decrypt(data, key = process.env.AES_KEYS) {
	if(process.env.SECURE == 'false') return data;

	var bytes = crypto.AES.decrypt(data, key);
	return bytes.toString(crypto.enc.Utf8);
};
