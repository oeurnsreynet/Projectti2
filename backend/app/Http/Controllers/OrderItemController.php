<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        // Logic to get all order items
        return response()->json(OrderItem::all());
    }

    public function show($id)
    {
        // Logic to get a specific order item by ID
        $orderItem = OrderItem::find($id);
        if (!$orderItem) {
            return response()->json(['error' => 'Order item not found'], 404);
        }
        return response()->json($orderItem);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
        ]);

        // Create a new order item
        $orderItem = OrderItem::create($request->all());

        return response()->json($orderItem, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric',
        ]);

        // Find the order item
        $orderItem = OrderItem::find($id);
        if (!$orderItem) {
            return response()->json(['error' => 'Order item not found'], 404);
        }

        // Update the order item
        $orderItem->update($request->all());

        return response()->json($orderItem);
    }

    public function destroy($id)
    {
        // Find the order item
        $orderItem = OrderItem::find($id);
        if (!$orderItem) {
            return response()->json(['error' => 'Order item not found'], 404);
        }

        // Delete the order item
        $orderItem->delete();

        return response()->json(['message' => 'Order item deleted successfully']);
    }

    public function getTotalPrice($order_id){
        // Logic to get the total price of all items in an order
        $totalPrice = OrderItem::where('order_id', $order_id)->sum('price');
        
        if ($totalPrice === 0) {
            return response()->json(['error' => 'No items found for this order'], 404);
        }

        return response()->json(['total_price' => $totalPrice]);
    }
}
