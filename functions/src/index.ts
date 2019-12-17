import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { MAILCHIMP_NEWSLETTER_LIST_ID, MAILCHIMP_AUTH_TOKEN, MAILCHIMP_API_BASE_URL } from './constants';

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