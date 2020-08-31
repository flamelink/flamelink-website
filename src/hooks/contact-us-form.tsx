import { unstable_useFormState as useFormState } from 'reakit/Form'
import { string, object } from 'yup'
import set from 'lodash/set'
import { getFirebaseApp } from '../utils/firebase'

const schema = object().shape({
  name: string().required('Please enter your name'),
  email: string()
    .email()
    .required('Please enter a valid email'),
  message: string().required('Please enter a message')
})

export const useContactUsForm = () => {
  return useFormState({
    resetOnUnmount: true,
    resetOnSubmitSucceed: false,
    values: { name: '', email: '', message: '' },
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
        const firebaseApp = await getFirebaseApp()

        await firebaseApp
          .firestore()
          .collection('contactUs')
          .add({
            ...payload,
            created: Date.now()
          })

        window.dataLayer.push({ event: 'e_formSubmit' })

        console.log(
          '[FLAMELINK]: Successfully submitted contact us form',
          payload
        )
      } catch (error) {
        console.error(error)

        // eslint-disable-next-line no-throw-literal
        throw { name: error.message }
      }
    }
  })
}
