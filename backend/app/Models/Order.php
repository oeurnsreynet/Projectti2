<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name', 'email', 'address', 'phone', 'note',
        'subtotal', 'shipping', 'total', 'order_date'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
