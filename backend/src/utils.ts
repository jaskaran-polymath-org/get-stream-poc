import { SHA_256_SECRET } from '../constants';
import { createHmac } from 'crypto';

export function createHMAC(texts: string[]) {
  const hmac = createHmac('sha256', SHA_256_SECRET);
  texts.forEach(text => hmac.update(text));

  return hmac.digest('hex');
}