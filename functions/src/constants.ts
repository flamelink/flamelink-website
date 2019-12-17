import * as functions from 'firebase-functions'
import { get } from 'lodash'

const config = functions.config()

// MailChimp
export const MAILCHIMP_NEWSLETTER_LIST_ID = get(config, 'mailchimp.newsletterListId', process.env.MAILCHIMP_NEWSLETTER_LIST_ID)
export const MAILCHIMP_AUTH_TOKEN = get(config, 'mailchimp.authToken', process.env.MAILCHIMP_AUTH_TOKEN)
export const MAILCHIMP_API_BASE_URL = get(config, 'mailchimp.apiBaseUrl', process.env.MAILCHIMP_API_BASE_URL)

// SendGrid
export const SENDGRID_API_KEY = get(config, 'sendgrid.apiKey', process.env.SENDGRID_API_KEY)