<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $messages = Message::with('user')->latest()->take(50)->get()->reverse();

        return view('chat.index', compact('messages'));
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = new Message();
        $message->user_id = Auth::id();
        $message->content = $request->input('message');
        $message->save();

        MessageSent::broadcast($message->content, $message->user_id);

        return response()->json([
            'message' => $message->load('user'),
        ]);
    }
}
