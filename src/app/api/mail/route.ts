import { sendEmail } from '@/app/services/ses'
import { config } from '@/app/constants/config'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  if (!name || !email || !subject || !message) {
    return new Response('Please fill all fields', { status: 400 })
  }

  const { contact_mail, sender_mail } = config

  const params = {
    Destination: {
      ToAddresses: [contact_mail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        },
      },
      Subject: {
        Data: `New message from ${name} - ${email} - ${new Date().toLocaleString()} by manuelenolli.ch`,
      },
    },
    Source: sender_mail,
  }

  try {
    await sendEmail(params)
    return new Response('Message Sent', { status: 200 })
  } catch (error) {
    return new Response('Error during sending message, please try again', { status: 500 })
  }
}