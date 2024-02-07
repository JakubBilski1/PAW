import styled from "styled-components"
import { useState } from "react"

const Form = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input[type="email"],
  textarea,
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: #66afe9;
    }
  }

  .chBox {
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin-right: 10px;
    }
  }

  .error {
    color: red;
    margin-top: 5px;
  }

  .success {
    color: green;
    margin-top: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: #454545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }
`;

function Contact() {
  const [data, setData] = useState<Object>({
    email: '',
    topic: 'general',
    dataAgreement: false,
    message: ''
  })
  const [errors, setErrors] = useState<{ emptyEmail: boolean, email: boolean, emptyMessage: boolean, messageLength: boolean }>({
    emptyEmail: false,
    emptyMessage: false,
    email: false,
    messageLength: false
  })
  const [messageStatus, setMessageStatus] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as EventTarget & { name: string, value: string }
    const { checked } = e.target as HTMLInputElement

    setData(prev => ({
      ...prev,
      [name]: name === 'dataAgreement' ? checked : value
    }))
  }

  const validateData = (email: string, message: string) => {
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if(email.length === 0 && message.length === 0) {
      setErrors(prev => ({
        ...prev,
        emptyEmail: true,
        emptyMessage: true
      }))
      setMessageStatus(false)
    }
    else if(email.length === 0) {
      setErrors(prev => ({
        ...prev,
        emptyEmail: true,
        emptyMessage: false
      }))
      setMessageStatus(false)
    }
    else if(message.length === 0) {
      setErrors(prev => ({
        ...prev,
        emptyEmail: false,
        emptyMessage: true
      }))
      setMessageStatus(false)
    }
    else {
      setErrors(prev => ({
        ...prev,
        emptyEmail: false,
        emptyMessage: false
      }))
    }
    if(email.length > 0 && !emailRegex.test(email)) {
      setErrors(prev => ({
        ...prev,
        email: true
      }))
      setMessageStatus(false)
    }
    else {
      setErrors(prev => ({
        ...prev,
        email: false
      }))
    }
    if(message.length > 0 && message.length < 20) {
      setErrors(prev => ({
        ...prev,
        messageLength: true
      }))
      setMessageStatus(false)
    }
    else {
      setErrors(prev => ({
        ...prev,
        messageLength: false
      }))
    }
    if(email.length > 0 && message.length > 0 && emailRegex.test(email) && message.length >= 20) {
      return true
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { email, message } = data as { email: string, message: string }
    const response = validateData(email, message)
    if(response) {
      setMessageStatus(true)
      console.log(data)
    }
  }

  return (
    <>
      {!messageStatus ? <Form action="/" method="POST">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e)=>handleChange(e)}
          required
        />
        {errors.email && <p className="error">Invalid email address</p>}
        {errors.emptyEmail && <p className="error">This field is required</p>}
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
        {errors.emptyMessage && <p className="error">This field is required</p>}
        <br />

        <button onClick={(e)=>handleSubmit(e)}>Send</button> 
      </Form> : <p className="success">Your message has been sent</p>}
    </>
  )
}

export default Contact