<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function index()
    {
        $abouts = About::all()->map(function ($about) {
            $about->image_url = $about->image ? asset('storage/' . $about->image) : null;
            return $about;
        });

        return response()->json($abouts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('abouts', 'public')
            : null;

        $about = About::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image' => $imagePath,
        ]);

        $about->image_url = $imagePath ? asset('storage/' . $imagePath) : null;

        return response()->json($about, 201);
    }

    public function show($id)
    {
        $about = About::findOrFail($id);
        $about->image_url = $about->image ? asset('storage/' . $about->image) : null;

        return response()->json($about);
    }

    public function update(Request $request, $id)
    {
        $about = About::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content']);

        if ($request->hasFile('image')) {
            if ($about->image) {
                Storage::disk('public')->delete($about->image);
            }

            $data['image'] = $request->file('image')->store('abouts', 'public');
        }

        $about->update($data);
        $about->image_url = $about->image ? asset('storage/' . $about->image) : null;

        return response()->json($about);
    }

    public function destroy($id)
    {
        $about = About::findOrFail($id);

        if ($about->image) {
            Storage::disk('public')->delete($about->image);
        }

        $about->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
