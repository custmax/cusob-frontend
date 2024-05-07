declare module sendTemplate {
    type sendModel = {
        from: string,
        to: string,
        body: {
            subject: string,
            template_invoke_name: string
        }
    }
}