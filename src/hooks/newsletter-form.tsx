import { unstable_useFormState as useFormState } from 'reakit/Form'
import { string, object } from 'yup'
import set from 'lodash/set'
import * as firebase from 'firebase/app'
import firebaseApp from '../utils/firebase'

const schema = object().shape({
  email: string()
    .email()
    .required('Please enter a valid email')
})

export const useNewsletterForm = () => {
  return useFormState({
    resetOnUnmount: true,
    resetOnSubmitSucceed: false,
    values: { email: '' },
    onValidate: values =>
      schema.validate(values, { abortEarly: false }).then(
        () => {
          // success no-op
        },
        error => {
          if (error.inner.length) {
            throw error.inner.reduce(
              (acc: Object, curr: any) => set(acc, curr.path, curr.message),
              {}
            )
          }
        }
      ),
    onSubmit: async payload => {
      try {
        await firebaseApp
          .firestore()
          .collection('newsletter')
          .add({
            ...payload,
            created: firebase.firestore.Timestamp.fromDate(new Date())
          })

        console.log(
          '[FLAMELINK]: Successfully subscribed to newsletter',
          payload
        )
      } catch (error) {
        console.error(error)

        // eslint-disable-next-line no-throw-literal
        throw { email: error.message }
      }
    }
  })
}