<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // public $timestamps = true;
    public $timestamps = false;

    protected $fillable = [
        'title',
        'content',
        'category',
        'status',
    ];

    protected $dateFormat = 'Y-m-d H:i:s';
}
