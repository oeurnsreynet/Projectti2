<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all()->map(function ($blog) {
            $blog->image_url = $blog->image ? asset('storage/' . $blog->image) : null;
            return $blog;
        });

        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'author'       => 'required|string|max:100',
            'image'        => 'nullable|image|max:2048',
            'published_at' => 'nullable|date',
        ]);

        $data = $request->only(['title', 'content', 'author', 'published_at']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('blogs', 'public');
        }

        $blog = Blog::create($data);
        $blog->image_url = $blog->image ? asset('storage/' . $blog->image) : null;

        return response()->json($blog, 201);
    }

    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->image_url = $blog->image ? asset('storage/' . $blog->image) : null;

        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'content'      => 'sometimes|required|string',
            'author'       => 'sometimes|required|string|max:100',
            'image'        => 'nullable|image|max:2048',
            'published_at' => 'nullable|date',
        ]);

        $data = $request->only(['title', 'content', 'author', 'published_at']);

        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }

            $data['image'] = $request->file('image')->store('blogs', 'public');
        }

        $blog->update($data);
        $blog->image_url = $blog->image ? asset('storage/' . $blog->image) : null;

        return response()->json($blog);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();
        return response()->json(['message' => 'Blog deleted']);
    }
}
