window.Echo.channel('chatroom')
    .listen('.message.sent', (e) => {
        console.log(e);
        // Assuming e.message contains the message content, e.user_id contains the user ID of the sender,
        // and e.user_name contains the user's name
        const messagesContainer = document.getElementById('chat-messages');
        const isCurrentUser = e.user_id === window.userId; // Ensure window.userId is set to the current user's ID when the page loads

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('mb-4');

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('flex', 'items-center', 'mb-1');

        const authorSpan = document.createElement('span');
        authorSpan.classList.add('font-bold', 'mr-2');
        authorSpan.innerText = e.name;

        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('text-gray-500', 'text-xs');
        timestampSpan.innerText = new Date().toLocaleString(); // You can format the timestamp as needed

        authorDiv.appendChild(authorSpan);
        authorDiv.appendChild(timestampSpan);

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('flex');
        messageContentDiv.classList.add(isCurrentUser ? 'justify-end' : 'justify-start');

        const messageBodyDiv = document.createElement('div');
        messageBodyDiv.classList.add(isCurrentUser ? 'bg-blue-500' : 'bg-gray-200', 'text-gray-800', 'p-2', 'rounded-lg');
        if (isCurrentUser) {
            messageBodyDiv.classList.remove('text-gray-800');
            messageBodyDiv.classList.add('text-white');
        }

        const messageP = document.createElement('p');
        messageP.classList.add('text-sm');
        messageP.innerText = e.message;

        messageBodyDiv.appendChild(messageP);
        messageContentDiv.appendChild(messageBodyDiv);

        messageDiv.appendChild(authorDiv);
        messageDiv.appendChild(messageContentDiv);

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom of the chat messages container
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
