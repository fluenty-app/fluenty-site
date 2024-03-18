export const maskMobile = (mobile) => {
  return mobile.substring(0, 4) + '***' + mobile.slice(-3);
}

export const maskEmail = (email: string) => {
  const [username, vendor] = email.split('@', 2);

  return username.substring(0, 2) + '*****@' + vendor;
}
