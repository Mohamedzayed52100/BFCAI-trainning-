@component('mail::table')
| name          | phone         | price  |
| ------------- |:-------------:| --------:|
| mohamed       | 01091643693   | $10      |
| ibrahim       | 01022797108   | $20      |
@endcomponent
@component('mail::message')
# Introduction

The body of your message.

@component('mail::button', ['url' => 'https://www.youtube.com/watch?v=RYwMzCV1cu4'])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
