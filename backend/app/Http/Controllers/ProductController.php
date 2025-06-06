<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get()->map(function ($product) {
            $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
            return $product;
        });

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image',
        ]);

        $data = $request->only(['category_id', 'name', 'description', 'price']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);
        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {  
        // dd($id);
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image',
        ]);

        $data = $request->only(['category_id', 'name', 'description', 'price']);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);
        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        Storage::disk('public')->delete($product->image);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
    public function productsByCategory($categoryName)
{
    $products = Product::whereHas('category', function ($query) use ($categoryName) {
        $query->where('name', $categoryName);
    })->get()->map(function ($product) {
        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
        return $product;
    });

    return response()->json($products);
}
}

