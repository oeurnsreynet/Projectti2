<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Get all orders
    public function index()
    {
        $orders = Order::with('items.product')->orderBy('order_date', 'desc')->get();
        return response()->json($orders);
    }

    // Get one order by id
    public function show($id)
    {
        $order = Order::with('items.product')->find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    // Create new order
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'phone' => 'required|string',
            'note' => 'nullable|string',
            'subtotal' => 'required|numeric',
            'shipping' => 'required|numeric',
            'total' => 'required|numeric',
            'order_date' => 'nullable|date',
        ]);

        // dd($request->all());

        $order = Order::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'note' => $request->note,
            'subtotal' => $request->subtotal,
            'shipping' => $request->shipping,
            'total' => $request->total,
            'order_date' => $request->order_date ?? now(),
        ]);

        return response()->json($order, 201);
    }
}
