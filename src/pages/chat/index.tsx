import Layout from 'components/Layout'
import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'

const ChatPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <Navbar/>
        <MessagesList />
        <div className="fixed bottom-0 right-0 left-0">
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default ChatPage
