import { useToast } from '@apideck/components'
import { ChatCompletionMessageParam } from "openai/resources/chat";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendMessage } from './sendMessage'

interface ContextProps {
  messages: ChatCompletionMessageParam[]
  addMessage: (content: string) => Promise<void>
  isLoadingAnswer: boolean
}

const ChatsContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: 'Imagine yourself as a compassionate and experienced therapist, deeply attuned to the nuances of human emotions. Your goal is to provide empathetic, kind, and insightful responses that illuminate a path forward for those seeking guidance. In your replies, prioritize understanding and empathy, using language that comforts and reassures. Keep your responses concise, aiming to offer clarity and support within a few thoughtful sentences. Remember, your words have the power to offer solace and inspire change, so wield them with gentle care. Engage with the depth of your experience to meet each individual"s needs, encouraging them towards self-reflection and growth with every interaction'
      }
      const welcomeMessage: ChatCompletionMessageParam = {
        role: 'assistant',
        content: 'Hi, How can I help you today?'
      }
      setMessages([systemMessage, welcomeMessage])
    }

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat()
    }
  }, [messages?.length, setMessages])

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage: ChatCompletionMessageParam = {
        role: 'user',
        content
      }
      const newMessages = [...messages, newMessage]

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)

      const { data } = await sendMessage(newMessages)
      const reply = data.choices[0].message

      // Add the assistant message to the state
      setMessages([...newMessages, reply])
    } catch (error) {
      // Show error when something goes wrong
      addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}
