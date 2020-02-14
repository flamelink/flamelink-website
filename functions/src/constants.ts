import * as functions from 'firebase-functions'
import { get } from 'lodash'

const config = functions.config()

// MailChimp
export const MAILCHIMP_NEWSLETTER_LIST_ID = get(config, 'mailchimp.newsletter_list_id', process.env.MAILCHIMP_NEWSLETTER_LIST_ID)
export const MAILCHIMP_AUTH_TOKEN = get(config, 'mailchimp.auth_token', process.env.MAILCHIMP_AUTH_TOKEN)
export const MAILCHIMP_API_BASE_URL = get(config, 'mailchimp.api_base_url', process.env.MAILCHIMP_API_BASE_URL)

// SendGrid
export const SENDGRID_API_KEY = get(config, 'sendgrid.api_key', process.env.SENDGRID_API_KEY)

// Slack
export const SLACK_LEGACY_TOKEN = get(config, 'slack.legacy_token', process.env.SLACK_LEGACY_TOKEN)

export const FLAMELINK_SUPPORT_EMAIL = 'support@flamelink.io'