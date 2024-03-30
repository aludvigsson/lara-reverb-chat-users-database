@extends('layouts.app')
@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold mb-4">Chatroom</h1>
            <div id="chat-messages" class="bg-white shadow-md rounded-lg p-4 mb-4 h-96 overflow-y-auto">
                @foreach ($messages as $message)
                    <div class="mb-4">
                        <div class="flex items-center mb-1">
                            <span class="font-bold mr-2">{{ $message->user->name }}</span>
                            <span class="text-gray-500 text-xs">{{ $message->created_at->format('m/d/Y h:i A') }}</span>
                        </div>
                        @if ($message->user->id === auth()->id())
                            <!-- Own message -->
                            <div class="flex justify-end">
                                <div class="bg-blue-500 text-white p-2 rounded-lg">
                                    <p class="text-sm">{{ $message->content }}</p>
                                </div>
                            </div>
                        @else
                            <!-- Other user's message -->
                            <div class="flex justify-start">
                                <div class="bg-gray-200 text-gray-800 p-2 rounded-lg">
                                    <p class="text-sm">{{ $message->content }}</p>
                                </div>
                            </div>
                        @endif
                    </div>
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
