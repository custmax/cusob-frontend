declare module Sender {
  type SaveSender = {
    email: string,
    id: number,
    imapPort: number,
    imapServer: string,
    password: string,
    popPort: number,
    popServer: string,
    smtpPort: number,
    smtpServer: string,
  }
}