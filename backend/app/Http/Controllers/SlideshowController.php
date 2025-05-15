<?php

namespace App\Http\Controllers;

use App\Models\Slideshow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SlideshowController extends Controller
{
    public function index()
    {
        $slides = Slideshow::orderBy('ssorder')->get()->map(function ($slide) {
            $slide->image_url = asset('storage/' . $slide->image);
            return $slide;
        });

        return response()->json($slides);
    }

    public function show($id)
    {
        $slide = Slideshow::find($id);
        if (!$slide) {
            return response()->json(['error' => 'Slide not found'], 404);
        }

        $slide->image_url = asset('storage/' . $slide->image);
        return response()->json($slide);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|image',
            'link' => 'nullable|url',
            'ssorder' => 'required|integer',
        ]);

        // Store the image file in the 'slides' folder within the 'public' disk
        $imagePath = $request->file('image')->store('slides', 'public');

        // Create the new slide
        $slide = Slideshow::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'link' => $request->link,
            'ssorder' => $request->ssorder,
        ]);

        // Set the image URL for the response
        $slide->image_url = asset('storage/' . $slide->image);

        return response()->json($slide, 201);
    }

    public function update(Request $request, $id)
    {
        $slide = Slideshow::find($id);
        if (!$slide) {
            return response()->json(['error' => 'Slide not found'], 404);
        }

        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'link' => 'nullable|url',
            'ssorder' => 'required|integer',
            'image' => 'nullable|image',
        ]);

        $data = $request->only(['title', 'description', 'link', 'ssorder']);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($slide->image);
            $data['image'] = $request->file('image')->store('slides', 'public');
        }

        $slide->update($data);
        $slide->image_url = asset('storage/' . $slide->image);

        return response()->json($slide);
    }

    public function destroy($id)
    {
        $slide = Slideshow::find($id);
        if (!$slide) {
            return response()->json(['error' => 'Slide not found'], 404);
        }

        Storage::disk('public')->delete($slide->image);
        $slide->delete();

        return
response()->json(['message' => 'Slide deleted']);
}
}