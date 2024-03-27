'use client'
import Layout from 'components/Layout'
import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import Navbar from 'components/Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { signUserInAnonymously } from 'pages/api/auth'
import { auth } from 'pages/api/firebase'
import { watchUserMessages } from 'pages/api/firestore'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { MessagesProvider } from 'utils/useMessages'

const ChatPage: NextPage = () => {
  const router = useRouter();
  const [user,setUser]=useState<string>('')

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.isAnonymous) {
        const uid = user.uid;

        setUser(uid)
        // Watch for changes in the user's messages count
        const unsubscribeMessages = watchUserMessages(uid, (count) => {
          if (count > 7) {
            Swal.fire({
              imageUrl: "/pro.png",
              title: "Upgrade Account",
              text:"You've used your 5 free messages! I've enjoyed getting to know you and hope I've been helpful so far. To unlock deeper support, personalized guidance, subscribe for just $20/month.",
              showCancelButton: false,
              confirmButtonText: "Proceed to Account",
              showLoaderOnConfirm: true,
            }).then(() => {
              router.push('/register')
            });
          }
        });

        return () => {
          unsubscribeMessages();
        };
      }else if(user && user.email){
        Swal.fire({
          imageUrl: "/sub.png",
          title: `WELCOME BACK ${user.email}`,
          text:"Welcome to your personalized mental wellness journey. Think of me as your AI companion, offering a listening ear, insightful exercises, and handy resources tailored to your needs. We can explore self-awareness, relaxation techniques, and even connect you with a supportive community. For serious concerns or diagnosis, please reach out to a qualified professional.",
          showCancelButton: false,
          confirmButtonText: "Start Conversation",
          showLoaderOnConfirm: true,
        })
      }
      else{
        signUserInAnonymously()
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [router]);
  return (
    <MessagesProvider>
      <Layout>
        <Navbar/>
        <div className='h-screen'>
        <MessagesList />
        </div>
        <div className="fixed bottom-0 right-0 left-0" >
          <MessageForm uid={user}/>
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default ChatPage
