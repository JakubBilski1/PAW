import { useState } from "react"

function page() {
  const [data, setData] = useState<Object>({
    email: '',
    topic: 'general',
    dataAgreement: false,
    message: ''
  })
  const [errors, setErrors] = useState<{ email: boolean, empty: boolean, messageLength: boolean }>({
    empty: false,
    email: false,
    messageLength: false
  })
  const [messageStatus, setMessageStatus] = useState<{}>({
    email: false,
    
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as EventTarget & { name: string, value: string }
    const { checked } = e.target as HTMLInputElement

    setData(prev => ({
      ...prev,
      [name]: name === 'dataAgreement' ? checked : value
    }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { email, message } = data as { email: string, message: string }
    if(email === '' || message === '') {
      setErrors(prev => ({
        ...prev,
        empty: true
      }))
      setMessageStatus(false)
      return
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!emailRegex.test(email)) {
      setErrors(prev => ({
        ...prev,
        email: true
      }))
      setMessageStatus(false)
      return
    }
    if(message.length < 20) {
      setErrors(prev => ({
        ...prev,
        messageLength: true
      }))
      setMessageStatus(false)
      return
    }
    console.log(data)
    setMessageStatus(true)
    setErrors(prev => ({
      ...prev,
      empty: false,
      email: false,
      messageLength: false
    }))
  }

  return (
    <>
      <form action="/" method="POST">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e)=>handleChange(e)}
          required
        />
        {errors.email && <p className="error">Invalid email address</p>}
        {errors.empty && <p className="error">This field is required</p>}
        <br />

        <label htmlFor="topic">Topic:</label>
        <select
          id="topic"
          name="topic"
          onChange={(e)=>handleChange(e)}
          required
        >
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Questions</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>

        <br />

        <div className="chBox">
          <input
            type="checkbox"
            id="dataAgreement"
            name="dataAgreement"
            onChange={(e)=>handleChange(e)}
            required
          />
          <label htmlFor="dataAgreement">I agree to process my personal data</label>
        </div>
        <br />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          onChange={(e)=>handleChange(e)}
          required
        ></textarea>
        {errors.messageLength && <p className="error">Message must have at least 20 characters</p>}
        {errors.empty && <p className="error">This field is required</p>}
        <br />

        <button onClick={(e)=>handleSubmit(e)}>Send</button>
        {messageStatus && <p className="success">Message sent successfully</p>}
      </form>
    </>
  )
}

export default page