# Comments Service

The comment service is responsible for creating and retrieving posts. 

# Running This Service

To run this service, execute <code> npm start </code> within the root directory of the service. 

## Routes

### GET

<pre>
<code>
    localhost:4001/posts/123/comments
<code>
</pre>

#### Response

<pre>
<code>
    [
        {
            "id": "1725f7be",
            "content": "Awesome Build!"
        }
    ]
</code>
</pre>

### POST

<pre>
<code>
    localhost:4001/posts/123/comments
<code>
</pre>

#### Body

<pre>
<code>
    {
        "content": "Sweet build!"
    }
</code>
</pre>

#### Response

<pre>
<code>
    [
        {
            "id": "1725f7be",
            "content": "Sweet Build!"
        }
    ]
</code>
</pre>
