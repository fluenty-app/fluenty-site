import validationLang from './validation.js';
import authLang from './auth.js';


export default {
  validation: validationLang,
  auth: authLang,
}

export function trans(line: string, payload = {}) {
  let keys = Object.keys(payload).map((key) => ":" + key);

  if (keys.length === 0) {
    return line;
  }

  return line.replace(
    new RegExp(keys.join("|"), "g"),
    key => payload[key.slice(1)]
  );
}
