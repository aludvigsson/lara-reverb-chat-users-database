window.Echo.channel('chatroom')
    .listen('.message.sent', (e) => {
        console.log(e);
        // Assuming e.message contains the message content and e.user_id contains the user ID of the sender
        const messagesContainer = document.getElementById('chat-messages');
        const isCurrentUser = e.user_id === window.userId; // Ensure window.userId is set to the current user's ID when the page loads

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', 'mb-4');
        messageDiv.classList.add(isCurrentUser ? 'justify-end' : 'justify-start');

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add(isCurrentUser ? 'bg-blue-500' : 'bg-gray-200', 'text-gray-800', 'p-2', 'rounded-lg');
        if(isCurrentUser) {
            messageContentDiv.classList.remove('text-gray-800');
            messageContentDiv.classList.add('text-white');
        }

        const messageP = document.createElement('p');
        messageP.classList.add('text-sm');
        messageP.innerText = e.message;

        messageContentDiv.appendChild(messageP);
        messageDiv.appendChild(messageContentDiv);
        messagesContainer.appendChild(messageDiv);
    });

window.sendMessage = function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message === '') return; // Prevent sending empty messages

    axios.post('/chat/send', { message: message })
        .then(response => {
            console.log(response.data);
            messageInput.value = ''; // Clear the input field after sending
        })
        .catch(error => console.error(error));

    console.log('sent message');
};
