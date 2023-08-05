<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Post::all();
        return response()->json($articles);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPaginatedArticles($limit, $offset)
    {
        if (!is_numeric($limit) || !is_numeric($offset) || $limit < 0 || $offset < 0) {
            return response()->json(['message' => 'Invalid limit or offset.'], 400);
        }

        $articles = Post::skip($offset)->take($limit)->get();

        return response()->json($articles);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min: 20|max:200',
            'content' => 'required|min: 200',
            'category' => 'required|min: 3|max:100',
            'status' => 'required|in:publish,draft,trash',
        ]);

        // $article = Post::create($request->all());
        $data = $request->all();

        $data['created_date'] = now();
        $data['updated_date'] = now();

        $article = Post::create($data);
        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Post::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found.'], 404);
        }
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|min: 20|max:200',
            'content' => 'required|min: 200',
            'category' => 'required|min: 3|max:100',
            'status' => 'required|in:publish,draft,trash',
        ]);

        $article = Post::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found.'], 404);
        }
        $article->fill($request->all());
        $article->updated_date = now();

        $article->save();
        
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Post::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found.'], 404);
        }
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully.']);
    }
}
