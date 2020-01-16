import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as sendGrid from '@sendgrid/mail'
import { MailData } from '@sendgrid/helpers/classes/mail';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { MAILCHIMP_NEWSLETTER_LIST_ID, MAILCHIMP_AUTH_TOKEN, MAILCHIMP_API_BASE_URL, SENDGRID_API_KEY, FLAMELINK_SUPPORT_EMAIL } from './constants';


async function sendEmail(message: MailData): Promise<void> {
  sendGrid.setApiKey(SENDGRID_API_KEY)

  try {
    await sendGrid.send(message)
    return console.log('Email successfully sent')
  } catch (error) {
    console.error('Email not sent: ' + error.toString())
    throw error
  }
}

type EmailContact = {
  email: string;
  name: string;
  message: string;
}

const getEmailMessage = (contact: EmailContact, to: string, subject: string, body?: string) => ({
  to,
  from: contact.email,
  fromname: contact.name,
  templateId: 'd-cf3317a90425489a9a856e29d4da558b',
  dynamic_template_data: {
    subject,
    body: body || `From: ${contact.name} - ${contact.email}: <p>${contact.message}</p>`
  }
})

export const contactUsSubmission = functions.firestore.document('contactUs/{docId}').onCreate((snapshot: DocumentSnapshot) => {
  const contact = snapshot.data() as EmailContact

  const userEmailBody = `
  <p>Thanks! We received your message. The team will contact you soon.</p>
  <p>Below is a copy of your message:</p>
  <div>
  <strong>Name:</strong> ${contact.name}<br/>
  <strong>Email:</strong> ${contact.email}<br/>
  <strong>Message:</strong> ${contact.message}<br/>
  </div>
  `

  return Promise.all([
    // Send email internally
    sendEmail(getEmailMessage(contact, FLAMELINK_SUPPORT_EMAIL, 'flamelink.io - Contact Us Submission')),
    // Send email to user
    sendEmail(getEmailMessage({ name: 'Flamelink', email: FLAMELINK_SUPPORT_EMAIL, message: '' }, contact.email, '[Flamelink] We received your message', userEmailBody))
  ])
})

export const newsletterSignUp = functions.firestore.document('newsletter/{docId}').onCreate((snapshot: DocumentSnapshot) => {
  const { email }: { email?: string } = snapshot.data() || {}

  return fetch(`${MAILCHIMP_API_BASE_URL}/3.0/lists/${MAILCHIMP_NEWSLETTER_LIST_ID}/members`, {
    method: 'POST',
    headers: {
      Authorization: MAILCHIMP_AUTH_TOKEN,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed'
    })
  })
    .then(async response => {
      const json = await response.json()

      if (response.status >= 300 && !(response.status === 400 && json.title === 'Member Exists')) {
        throw new Error(`Newsletter subscription failed: ${json.title}`);
      }
    })
})