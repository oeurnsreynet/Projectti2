<?php

namespace App\Http\Controllers;

use App\Models\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LogoController extends Controller
{
    public function index()
    {
        $logos = Logo::all()->map(function ($logo) {
            $logo->image_url = $logo->image ? asset('storage/' . $logo->image) : null;
            return $logo;
        });

        return response()->json($logos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $request->file('image')->store('logos', 'public');

        $logo = Logo::create([
            'title' => $request->title,
            'image' => $imagePath,
        ]);

        $logo->image_url = asset('storage/' . $logo->image);

        return response()->json($logo, 201);
    }

    public function show($id)
    {
        $logo = Logo::findOrFail($id);
        $logo->image_url = $logo->image ? asset('storage/' . $logo->image) : null;

        return response()->json($logo);
    }

    public function update(Request $request, $id)
    {
        $logo = Logo::findOrFail($id);

        $request->validate([
            'title' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($logo->image) {
                Storage::disk('public')->delete($logo->image);
            }
            $imagePath = $request->file('image')->store('logos', 'public');
            $logo->image = $imagePath;
        }

        if ($request->has('title')) {
            $logo->title = $request->title;
        }

        $logo->save();

        $logo->image_url = $logo->image ? asset('storage/' . $logo->image) : null;

        return response()->json($logo);
    }

    public function destroy($id)
    {
        $logo = Logo::findOrFail($id);

        if ($logo->image) {
            Storage::disk('public')->delete($logo->image);
        }

        $logo->delete();

        return response()->json(['message' => 'Logo deleted successfully']);
    }
}
