@extends('layouts.app')
@section('content')
    <div class="container mx-auto px-4 py-8 ">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold mb-4">Chat</h1>

            <div id="chat-messages" class="bg-white shadow-md rounded-lg p-4 mb-4">
                @foreach ($messages as $message)
                    @if ($message->user->id === auth()->id())
                        <!-- Own message -->
                        <div class="flex justify-end mb-4">
                            <div class="bg-blue-500 text-white p-2 rounded-lg">
                                <p class="text-sm">{{ $message->content }}</p>
                            </div>
                        </div>
                    @else
                        <!-- Other user's message -->
                        <div class="flex justify-start mb-4">
                            <div class="bg-gray-200 text-gray-800 p-2 rounded-lg">
                                <p class="text-sm">{{ $message->content }}</p>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>


            <form id="chat-form">
                <div class="flex">
                    <input type="text" name="message" id="messageInput" class="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message..." required>
                    <button type="button" onclick="window.sendMessage()" class="bg-blue-500 text-white rounded-r-lg px-4 py-2">Send</button>
                </div>
            </form>
        </div>
    </div>
@endsection
