const validToken = `any-userId$${process.env.JWT_SECRET}`;

export default {
  validToken,
  invalidToken: "invalid-userid$secret-key",
  urlWithToken: `www.borarachar.online/register/complete/${validToken}`,
  urlWithoutToken: "www.borarachar.online",
  urlSuccessfullRegister: "www.borarachar.online/register/successfully"
}
