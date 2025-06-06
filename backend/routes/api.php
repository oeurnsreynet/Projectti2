<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SlideshowController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LogoController;

// Auth Routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    Route::post('/user', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
});

// Slideshow Routes
Route::group(['middleware' => 'api', 'prefix' => 'slideshows'], function () {
    Route::get('/', [SlideshowController::class, 'index']);
    Route::post('/slideshow', [SlideshowController::class, 'store']);
    Route::get('/{id}', [SlideshowController::class, 'show']);
    Route::put('/slideshow{id}', [SlideshowController::class, 'update']);
    Route::delete('/{id}', [SlideshowController::class, 'destroy']);
});

// Category Routes
Route::group(['middleware' => 'api', 'prefix' => 'categories'], function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/category', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/category{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

// Product Routes (including new route for filtering by category)
Route::group(['middleware' => 'api', 'prefix' => 'products'], function () {
    Route::get('/', [ProductController::class, 'index']);              // GET /api/products
    Route::get('/category/{categoryName}', [ProductController::class, 'productsByCategory']);  // GET /api/products/category/{categoryName}
    Route::post('/product', [ProductController::class, 'store']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});

// Order Routes
Route::group(['middleware' => 'api', 'prefix' => 'orders'], function () {
    Route::post('/order', [OrderController::class, 'store']);
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{id}', [OrderController::class, 'show']);
});

Route::group(['middleware' => 'api', 'prefix' => 'order-items'], function () {
    Route::post('/', [OrderItemController::class, 'store']);
    Route::get('/', [OrderItemController::class, 'index']);
    Route::get('/{id}', [OrderItemController::class, 'show']);
    Route::put('/{id}', [OrderItemController::class, 'update']);
    Route::delete('/{id}', [OrderItemController::class, 'destroy']);
    Route::get('/order/{orderId}', [OrderItemController::class, 'getTotalPrice']);
});

// About Routes
Route::group(['middleware' => 'api', 'prefix' => 'abouts'], function () {
    Route::get('/', [AboutController::class, 'index']);
    Route::post('/about', [AboutController::class, 'store']);
    Route::get('/{id}', [AboutController::class, 'show']);
    Route::put('/{id}', [AboutController::class, 'update']);
    Route::delete('/{id}', [AboutController::class, 'destroy']);
});

// Blog Routes
Route::group(['middleware' => 'api', 'prefix' => 'blogs'], function () {
    Route::get('/', [BlogController::class, 'index']);
    Route::post('/blog', [BlogController::class, 'store']);
    Route::get('/{id}', [BlogController::class, 'show']);
    Route::put('/{id}', [BlogController::class, 'update']);
    Route::delete('/{id}', [BlogController::class, 'destroy']);
});

// Contact Routes
Route::group(['middleware' => 'api', 'prefix' => 'contacts'], function () {
    Route::get('/', [ContactController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::get('/{id}', [ContactController::class, 'show']);
    Route::put('/{id}', [ContactController::class, 'update']);
    Route::delete('/{id}', [ContactController::class, 'destroy']);
});

// Logo Routes
Route::group(['middleware' => 'api', 'prefix' => 'logos'], function () {
    Route::get('/', [LogoController::class, 'index']);
    Route::post('/logo', [LogoController::class, 'store']);
    Route::get('/{id}', [LogoController::class, 'show']);
    Route::put('/{id}', [LogoController::class, 'update']);
    Route::delete('/{id}', [LogoController::class, 'destroy']);
});
