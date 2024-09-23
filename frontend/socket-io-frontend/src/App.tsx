import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // socket.connect() is the function that will connect to our server to establish our FDC (full duplex connection)
    // this initiates our handshake
    socket.connect();
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  }

  return (
    <Container>
      <h3>
        Connection Status: {isConnected ? "Connected" : "Not Connected :("}
      </h3>

      <>
        {isConnected ? (
          <>
            <ChatBody socket={socket} />
            <MessageInput socket={socket}/>
            <Button onClick={handleDisconnect} variant="danger">Disconnect</Button>
          </>
        ) : (
          <>
            <Button onClick={handleConnect}>Connect</Button>
          </>
        )}
      </>
    </Container>
  );
}

export default App;
